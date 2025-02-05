import { Card, CardContent } from "@/components";
import { Trophy } from "lucide-react";

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  points: number;
}

export default function AchievementCard({
  title,
  description,
  date,
  points,
}: AchievementCardProps) {
  return (
    <Card className="transition-colors duration-200 bg-white border-2 rounded-xl dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-800 hover:border-primaryper dark:hover:border-primaryper ">
      <div className="flex justify-end">
        <div className="p-2 text-white bg-primaryper/90 hover:bg-primaryper rounded-s-2xl rounded-tr-xl">
          <span className="text-sm font-bold text-white">{points} exp</span>
        </div>
      </div>
      <CardContent className="flex items-start gap-4 p-4">
        <div className="p-3 rounded-full bg-primaryper/20">
          <Trophy className="w-5 h-5 text-primaryper" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 font-semibold dark:text-white text-neutral-900">
            {title}
          </h3>
          <p className="mb-1 text-sm text-gray-400">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
