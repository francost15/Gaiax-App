import { Button } from "@/components";

interface RatingQuestionProps {
  min: number;
  max: number;
  ratingValue: number;
  setRatingValue: (value: number) => void;
}

export const RatingQuestion = ({
  min,
  max,
  ratingValue,
  setRatingValue,
}: RatingQuestionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((val) => (
          <Button
            key={val}
            variant={val === ratingValue ? "default" : "outline"}
            onClick={() => setRatingValue(val)}
            className={`w-10 h-10 rounded-xl ${
              val === ratingValue
                ? "bg-primaryper text-white"
                : "bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200"
            } border-none hover:bg-primary-hover`}
          >
            {val}
          </Button>
        ))}
      </div>
    </div>
  );
};
