import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600 dark:text-green-400'
        : score > 49
            ? 'text-yellow-600 dark:text-yellow-400' 
            : 'text-red-600 dark:text-red-400';

    return (
        <div className="resume-summary border-t border-gray-200 dark:border-gray-700 last:rounded-b-2xl">
            <div className="category flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-xl font-semibold">
                    <span className={textColor}>{score}</span>
                    <span className="text-gray-500 dark:text-gray-400">/100</span>
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md w-full overflow-hidden transition-colors duration-200">
            <div className="flex flex-col sm:flex-row items-center p-6 gap-6 border-b border-gray-200 dark:border-gray-700">
                <ScoreGauge score={feedback.overallScore} />
                <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Resume Score</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700  ">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary