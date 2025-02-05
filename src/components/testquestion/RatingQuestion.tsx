import { Button } from "@/components";

interface RatingQuestionProps {
  min: number;
  max: number;
  ratingValue: number;
  setRatingValue: (value: number) => void;
  title?: string;
  classname?: string;
  handleSubmit?: () => void;
}

export const RatingQuestion = ({
  min,
  max,
  ratingValue,
  setRatingValue,
  title = "Siguiente",
  classname = "w-full bg-primaryper hover:bg-primary-hover text-white transition-all duration-300 transform hover:scale-105 py-4 sm:py-3",
  handleSubmit,
}: RatingQuestionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2 space-x-7 p-4">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((val) => (
          <Button
            key={val}
            variant={val === ratingValue ? "default" : "outline"}
            onClick={() => setRatingValue(val)}
            className={`flex justify-around  w-10 h-10 rounded-xl ${
              val === ratingValue
                ? "bg-primaryper text-white"
                : "bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200"
            } border-none hover:bg-primary-hover mr-2`}
          >
            {val}
          </Button>
        ))}
      </div>
      {handleSubmit && (
        <Button title={title} onClick={handleSubmit} className={classname}>
          {title}
        </Button>
      )}
    </div>
  );
};
