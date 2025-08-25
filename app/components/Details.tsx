import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./According";

const ScoreBadge = ({ score }: { score: number }) => {
  const bgColor = score > 69 
    ? 'bg-green-100 dark:bg-green-900/50' 
    : score > 39 
      ? 'bg-yellow-100 dark:bg-yellow-900/50' 
      : 'bg-red-100 dark:bg-red-900/50';
      
  const textColor = score > 69 
    ? 'text-green-800 dark:text-green-200' 
    : score > 39 
      ? 'text-yellow-800 dark:text-yellow-200' 
      : 'text-red-800 dark:text-red-200';
      
  const iconColor = score > 69 
    ? 'text-green-600 dark:text-green-400' 
    : score > 39 
      ? 'text-yellow-600 dark:text-yellow-400' 
      : 'text-red-600 dark:text-red-400';

  return (
    <div className={cn("flex flex-row gap-1 items-center px-2.5 py-1 rounded-full text-sm font-medium shadow-sm", bgColor, textColor)}>
      {score > 69 ? (
        <svg className={`w-3.5 h-3.5 mr-1 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className={`w-3.5 h-3.5 mr-1 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )}
      {score}/100
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-3 items-center py-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-3">
      {tips.map((tip, index) => (
        <div
          key={index}
          className={cn(
            "rounded-lg p-4 transition-all duration-200",
            tip.type === "good"
              ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
              : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200"
          )}
        >
          <div className="flex flex-row gap-3 items-start">
            <div className={`p-1 rounded-full mt-0.5 ${
              tip.type === "good" 
                ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-300' 
                : 'bg-yellow-100 dark:bg-yellow-800/50 text-yellow-600 dark:text-yellow-300'
            }`}>
              {tip.type === "good" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{tip.tip}</p>
              <p className="text-sm mt-1.5 opacity-90">{tip.explanation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Feedback</h2>
      <Accordion allowMultiple={true} className="w-full space-y-2">
        <AccordionItem 
          id="tone" 
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <AccordionHeader itemId="tone">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone" className="pt-2">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          id="content" 
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content" className="pt-2">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          id="structure" 
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure" className="pt-2">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem 
          id="skills" 
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
        >
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills" className="pt-2">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;