import { Button, Label } from "@/components";

interface AvailableTimeQuestionProps {
  answers: number[];
  selectedTime: number | null | undefined;
  setSelectedTime: (time: number) => void;
  title?: string;
  classname?: string;
  handleSubmit?: () => void;
}

export const AvailableTimeQuestion = ({
  answers,
  selectedTime,
  setSelectedTime,
  title = "Enviar respuesta",
  classname = "w-full bg-primaryper hover:bg-primary-hover text-white transition-all duration-300 transform hover:scale-105 py-4 sm:py-3",
  handleSubmit,
}: AvailableTimeQuestionProps) => {
  const currentTime = selectedTime ?? null;
  return (
    <div className="space-y-3">
      {answers.map((answer, i) => (
        <div
          key={i}
          className={`flex items-center space-x-2 p-4 rounded-lg transition-all duration-200 transform
              ${
                currentTime === answer
                  ? "bg-primaryper text-white"
                  : "dark:hover:bg-neutral-800 hover:bg-neutral-100"
              }
              animate-fade-in-up`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <input
            type="radio"
            id={`available-time-${i}`}
            name="availableTime"
            checked={currentTime === answer}
            onChange={() => {
              console.log("Seleccionado:", answer);
              setSelectedTime(answer);
            }}
          />
          <Label
            htmlFor={`available-time-${i}`}
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
