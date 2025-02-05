"use client";
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
    <Card className="transition-colors duration-200 bg-white dark:bg-neutral-900 border-2 border-gray-100 dark:border-neutral-800 rounded-xl hover:border-primaryper dark:hover:border-primaryper">
      <div className="flex justify-end">
        <Badge className="bg-primaryper/90 hover:bg-primaryper p-2 border-none rounded-e-2xl ">
          <span className="text-xs font-bold text-white">{points} exp</span>
        </Badge>
      </div>
      <CardContent className="flex items-start gap-4 p-4">
        <div className="p-3 rounded-full bg-primaryper/20">
          <Trophy className="w-6 h-6 text-primaryper" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-xl font-semibold dark:text-white text-neutral-900">
            {title}
          </h3>
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {date}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
