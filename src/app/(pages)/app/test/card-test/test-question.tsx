"use client";
import { useEffect } from "react";
import {
  Button,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Slider,
} from "@/components";
import { Check, Star, List, MessageSquare, HelpCircle } from "lucide-react";
import { useTestStore } from "@/store";

interface Question {
  text: string;
  type: string;
  answers?: string[];
  maxSelections?: number;
  min?: number;
  max?: number;
  options?: string[];
  placeholder?: string;
}

interface LearningProfileQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
}

export default function LearningProfileQuestion({
  question,
  onAnswer,
}: LearningProfileQuestionProps) {
  const {
    selectedAnswers,
    ratingValue,
    rankingValues,
    openEndedAnswer,
    yesNoAnswer,
    setSelectedAnswers,
    setRatingValue,
    setRankingValues,
    setOpenEndedAnswer,
    setYesNoAnswer,
    resetRanking,
  } = useTestStore();

  useEffect(() => {
    if (question.type === "ranking" && question.options) {
      resetRanking(question.options);
    }
  }, [question, resetRanking]);

  const handleMultipleChoice = (answer: string) => {
    const updated = selectedAnswers.includes(answer)
      ? selectedAnswers.filter((a) => a !== answer)
      : [...selectedAnswers, answer];
    if (question.maxSelections && updated.length > question.maxSelections)
      return;
    setSelectedAnswers(updated);
  };

  const handleYesNoSelection = (value: boolean) => setYesNoAnswer(value);

  const handleSubmit = () => {
    switch (question.type) {
      case "multipleChoice":
        onAnswer(selectedAnswers);
        break;
      case "singleChoice":
        onAnswer(selectedAnswers[0]);
        break;
      case "rating":
        onAnswer(ratingValue);
        break;
      case "ranking":
        onAnswer(rankingValues);
        break;
      case "openEnded":
        onAnswer(openEndedAnswer);
        break;
      case "yesNo":
        onAnswer(yesNoAnswer);
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "multipleChoice":
      case "singleChoice":
        return <Check className="w-5 h-5 text-primaryper" />;
      case "rating":
        return <Star className="w-5 h-5 text-primaryper" />;
      case "ranking":
        return <List className="w-5 h-5 text-primaryper" />;
      case "openEnded":
        return <MessageSquare className="w-5 h-5 text-primaryper" />;
      case "yesNo":
        return <HelpCircle className="w-5 h-5 text-primaryper" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-0 sm:space-y-6">
      <h3 className="hidden sm:flex text-lg font-semibold text-gray-800 dark:text-white items-center">
        {getIcon(question.type)}
        <span className="ml-2">{question.text}</span>
      </h3>

      {question.type === "multipleChoice" && (
        <div className="space-y-3">
          {question.answers?.map((answer, i) => (
            <div
              key={i}
              className={`flex items-center space-x-2 p-4 rounded-lg transition-all duration-200 transform opacity-0 translate-y-4 animate-fade-in-up ${
                selectedAnswers.includes(answer)
                  ? "bg-primaryper text-white"
                  : "dark:hover:bg-neutral-800 hover:bg-neutral-100"
              }`}
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
      )}

      {question.type === "singleChoice" && (
        <RadioGroup
          title="Seleccionar respuesta"
          onValueChange={(val) => setSelectedAnswers([val])}
          className="space-y-3"
        >
          {question.answers?.map((answer, i) => (
            <div
              key={i}
              className={`flex items-center space-x-2 p-4 rounded-lg transition-all duration-200 transform opacity-0 translate-y-4 animate-fade-in-up ${
                selectedAnswers.includes(answer)
                  ? "bg-primaryper text-white"
                  : "dark:hover:bg-neutral-800 hover:bg-neutral-100"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <RadioGroupItem value={answer} id={`answer-${i}`} />
              <Label
                htmlFor={`answer-${i}`}
                className="flex-grow cursor-pointer text-sm sm:text-base"
              >
                {answer}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {question.type === "rating" && (
        <div className="space-y-4">
          <Slider
            title="Seleccionar respuesta"
            min={question.min || 1}
            max={question.max || 5}
            value={[ratingValue]}
            onValueChange={(v) => setRatingValue(v[0])}
            className="w-full"
          />
          <div className="flex justify-between">
            {Array.from(
              { length: (question.max || 5) - (question.min || 1) + 1 },
              (_, i) => i + (question.min || 1)
            ).map((val) => (
              <Button
                key={val}
                variant={val === ratingValue ? "default" : "outline"}
                onClick={() => setRatingValue(val)}
                className="w-10 h-10"
              >
                {val}
              </Button>
            ))}
          </div>
        </div>
      )}

      {question.type === "ranking" && (
        <div className="space-y-4">
          {question.options?.map((option, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors transform opacity-0 translate-x-4 animate-fade-in-left"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Input
                type="number"
                min={1}
                max={question.options?.length ?? 0}
                value={rankingValues[option] ?? ""}
                onChange={(e) =>
                  setRankingValues({
                    ...rankingValues,
                    [option]: Number(e.target.value),
                  })
                }
                className="w-16 text-center"
              />
              <Label className="flex-grow">{option}</Label>
            </div>
          ))}
        </div>
      )}

      {question.type === "openEnded" && (
        <Input
          title="Responder pregunta"
          placeholder={question.placeholder}
          value={openEndedAnswer}
          onChange={(e) => setOpenEndedAnswer(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      )}

      {question.type === "yesNo" && (
        <div className="flex justify-center space-x-4">
          <Button
            title="Seleccionar respuesta"
            onClick={() => handleYesNoSelection(true)}
            variant={yesNoAnswer === true ? "default" : "outline"}
            className="w-24"
          >
            Sí
          </Button>
          <Button
            onClick={() => handleYesNoSelection(false)}
            variant={yesNoAnswer === false ? "default" : "outline"}
            className="w-24"
          >
            No
          </Button>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-neutral-900 sm:relative sm:p-0 sm:bg-transparent sm:dark:bg-transparent transition-all duration-300 transform opacity-0 translate-y-4 animate-fade-in-up">
        <Button
          title="Enviar respuesta"
          onClick={handleSubmit}
          className="w-full bg-primaryper hover:bg-primary-hover text-white transition-all duration-300 transform hover:scale-105 py-4 sm:py-3"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
