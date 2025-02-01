import { Label } from "@/components";

interface SingleChoiceQuestionProps {
  answers: string[];
  selectedAnswers: string[];
  setSelectedAnswers: (answers: string[]) => void;
}

export const SingleChoiceQuestion = ({
  answers,
  selectedAnswers,
  setSelectedAnswers,
}: SingleChoiceQuestionProps) => {
  return (
    <div className="space-y-3">
      {answers.map((answer, i) => (
        <div
          key={i}
          className={`flex items-center space-x-2 p-4 rounded-lg transition-all duration-200 transform
            ${
              selectedAnswers.includes(answer)
                ? "bg-primaryper text-white"
                : "dark:hover:bg-neutral-800 hover:bg-neutral-100"
            }
            animate-fade-in-up`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <input
            type="radio"
            id={`single-answer-${i}`}
            name="singleChoice"
            checked={selectedAnswers.includes(answer)}
            onChange={() => setSelectedAnswers([answer])}
          />
          <Label
            htmlFor={`single-answer-${i}`}
            className="flex-grow cursor-pointer text-sm sm:text-base"
          >
            {answer}
          </Label>
        </div>
      ))}
    </div>
  );
};
