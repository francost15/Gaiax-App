import { Card, CardContent } from "@/components";
import { Trophy } from "lucide-react";
import { Badge } from "../ui/badge";

interface Props {
  title: string;
  description: string;
  date: string;
  points: number;
}

export default function CompletedCoursesCard({
  title,
  description,
  date,
  points,
}: Props) {
  return (
    <Card className="transition-colors duration-200 bg-white rounded-t-none dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-800 rounded-xl hover:border-primaryper dark:hover:border-primaryper rounded-e-none">
      <div className="flex justify-end">
        <Badge className="rounded-t-none bg-primaryper/90 hover:bg-primaryper rounded-e-none">
          <span className="text-sm text-white">{points} exp</span>
        </Badge>
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
