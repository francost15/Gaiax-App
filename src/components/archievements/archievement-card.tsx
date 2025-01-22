import { Card, CardContent, Badge } from "@/components";
import { Trophy, Calendar } from "lucide-react";

interface Props {
  title: string;
  description: string;
  date: string;
  category: string;
  points: number;
}

export const AchievementCard = ({
  title,
  description,
  date,
  category,
  points,
}: Props) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-neutral-900 border-none group">
      <CardContent className="p-6 group-hover:ring-2 group-hover:ring-primaryper rounded-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="secondary"
            className="bg-primaryper/20 text-primaryper dark:bg-primaryper/30 dark:text-[#A5B4FC]"
          >
            {category}
          </Badge>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-primaryper mr-2" />
            <span className="font-semibold text-primaryper">
              {points} puntos
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
