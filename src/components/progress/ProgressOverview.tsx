"use client";
import { DailyProgress } from "../home/Daily_Progress/DailyProgress";
import { LearningSummary } from "../home/LearningSummary/LearningSummary";
interface Props {
  xp: number;
  lesson: number;
  progress: number;
}
export function ProgressOverview({ xp, lesson, progress }: Props) {
  return (
    <div className="grid gap-8 mb-8 md:grid-cols-2">
      <DailyProgress xp={xp} lesson={lesson} progress={progress} />
      <LearningSummary />
    </div>
  );
}
