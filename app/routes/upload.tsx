import {type FormEvent, useState, useEffect} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "~/constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        // Handle authentication state
        if (isLoading) return;
        
        if (!auth.isAuthenticated) {
            // Small delay to prevent flash of content
            const timer = setTimeout(() => {
                navigate(`/auth?next=${encodeURIComponent('/upload')}`);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [auth.isAuthenticated, isLoading, navigate]);
    
    // Show loading state while checking auth
    if (isLoading || !auth.isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navbar />
                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {isLoading ? 'Checking authentication...' : 'Redirecting to login...'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        // Check authentication before proceeding
        if (!auth.isAuthenticated) {
            setStatusText('Authentication required. Redirecting...');
            navigate('/auth?next=/upload');
            return;
        }

        setIsProcessing(true);

        try {
            setStatusText('Uploading the file...');
            const uploadedFile = await fs.upload([file]);
            if(!uploadedFile) throw new Error('Failed to upload file');

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if(!imageFile.file) throw new Error('Failed to convert PDF to image');

            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if(!uploadedImage) throw new Error('Failed to upload image');

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText('Analyzing...');

            const instructions = prepareInstructions({ jobTitle, jobDescription });
            console.log('AI instructions being sent:', instructions);
            console.log('Uploaded file path:', uploadedFile.path);

            const feedback = await ai.feedback(
                uploadedFile.path,
                instructions
            )
            
            console.log('AI feedback response:', feedback);
            
            // Check if the response is an error format
            if (!feedback || (feedback as any).success === false) {
                console.error('Full AI feedback error object:', JSON.stringify(feedback, null, 2));
                const errorDetails = (feedback as any)?.error;
                console.error('Error details:', errorDetails);
                
                // Handle specific error types
                if (errorDetails?.type === 'AuthenticationError') {
                    throw { success: false, error: { type: 'AuthenticationError', message: 'Authentication required' } };
                }
                
                const errorMsg = errorDetails?.message || errorDetails?.type || errorDetails?.code || 'AI service returned an error';
                throw new Error(`AI analysis failed: ${errorMsg}`);
            }

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            data.feedback = JSON.parse(feedbackText);
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText('Analysis complete, redirecting...');
            console.log(data);
            navigate(`/resume/${uuid}`);
        } catch (error) {
            console.error('Error in handleAnalyze:', error);
            
            // Check if it's a Puter API error format
            if (error && typeof error === 'object' && 'success' in error && error.success === false) {
                const errorDetails = (error as any)?.error;
                console.error('Puter API error details:', errorDetails);
                
                if (errorDetails?.type === 'AuthenticationError' || errorDetails?.message?.includes('401') || errorDetails?.message?.includes('Unauthorized')) {
                    setStatusText('Authentication expired. Please log in again.');
                    setTimeout(() => navigate('/auth?next=/upload'), 2000);
                    setIsProcessing(false);
                    return;
                }
                
                // Handle other specific error types
                const errorMsg = errorDetails?.message || errorDetails?.type || errorDetails?.code || 'API service error';
                setStatusText(`Error: ${errorMsg}`);
                setIsProcessing(false);
                return;
            }
            
            // Handle regular Error objects
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setStatusText(`Error: ${errorMessage}`);
            setIsProcessing(false);
            throw error; // Re-throw to be caught by handleSubmit
        }
 
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        try {
            await handleAnalyze({ companyName, jobTitle, jobDescription, file });
        } catch (error) {
            console.error('Error analyzing resume:', error);
            setStatusText('Error: Failed to analyze resume. Please try again.');
            setIsProcessing(false);
        }
    }

    // Authentication is handled by the first useEffect and loading state


    return (
        <main className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1 className='text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white'>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2 className="text-xl text-center text-gray-600 dark:text-gray-300">{statusText}</h2>
                            <div className="flex justify-center mt-8">
                                <img src="/images/resume-scan.gif" className="max-w-md w-full" alt="Analyzing resume..." />
                            </div>
                        </>
                    ) : (
                        <h2 className="text-xl text-center text-gray-600 dark:text-gray-300">Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload