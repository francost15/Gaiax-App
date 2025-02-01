import { Checkbox, Label } from "@/components";

interface MultipleChoiceQuestionProps {
  answers: string[];
  selectedAnswers: string[];
  handleMultipleChoice: (answer: string) => void;
}

export const MultipleChoiceQuestion = ({
  answers,
  selectedAnswers,
  handleMultipleChoice,
}: MultipleChoiceQuestionProps) => {
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
          <Checkbox
            title="Seleccionar respuesta"
            id={`answer-${i}`}
            checked={selectedAnswers.includes(answer)}
            onCheckedChange={() => handleMultipleChoice(answer)}
            className="text-white"
          />
          <Label
            htmlFor={`answer-${i}`}
            className="flex-grow cursor-pointer text-sm sm:text-base"
          >
            {answer}
          </Label>
        </div>
      ))}
    </div>
  );
};
