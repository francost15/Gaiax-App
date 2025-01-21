import { Button } from "@/components";

interface VAKQuestionProps {
  question: {
    text: string;
    answers: {
      text: string;
      type: "V" | "A" | "K";
    }[];
  };
  onAnswer: (type: "V" | "A" | "K") => void;
}

export default function VAKQuestion({ question, onAnswer }: VAKQuestionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(answer.type)}
            className="w-full py-4 px-6 text-left justify-start bg-gray-100 hover:bg-primary-hover hover:text-white dark:bg-neutral-800 dark:hover:bg-primary-hover text-gray-800 dark:text-white border-none shadow-none transition-colors duration-200"
          >
            {answer.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
