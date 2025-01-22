import { Card, CardContent } from "@/components";
import { Trophy } from "lucide-react";
import { Badge } from "../ui/badge";

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
    <Card className="bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors duration-200 dark:border-neutral-800 rounded-xl hover:border-primaryper dark:hover:border-primaryper rounded-t-none rounded-e-none">
      <div className="flex justify-end">
        <Badge className="bg-primaryper/90  hover:bg-primaryper rounded-t-none rounded-e-none">
          <span className="text-sm text-white">{points} exp</span>
        </Badge>
      </div>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="rounded-full bg-primaryper/20 p-3">
          <Trophy className="h-5 w-5 text-primaryper" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold dark:text-white text-neutral-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-1">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
