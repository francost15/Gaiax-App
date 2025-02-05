import { Button, Checkbox, Label } from "@/components";

interface MultipleChoiceQuestionProps {
  answers: (string | number)[]; // Permitir respuestas que sean cadenas o números
  selectedAnswers: (string | number)[]; // Permitir respuestas seleccionadas que sean cadenas o números
  handleMultipleChoice: (answer: string | number) => void; // Permitir respuestas que sean cadenas o números
  title?: string;
  classname?: string;
  handleSubmit?: () => void;
}

export const MultipleChoiceQuestion = ({
  answers,
  selectedAnswers,
  handleMultipleChoice,
  title = "Siguiente",
  classname = "w-full bg-primaryper hover:bg-primary-hover text-white transition-all duration-300 transform hover:scale-105 py-4 sm:py-3",
  handleSubmit,
}: MultipleChoiceQuestionProps) => {
  return (
    <div className="space-y-3 p-2 ">
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
      {handleSubmit && (
        <Button title={title} onClick={handleSubmit} className={classname}>
          {title}
        </Button>
      )}
    </div>
  );
};
