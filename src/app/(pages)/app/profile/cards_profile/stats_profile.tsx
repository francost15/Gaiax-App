import { Trophy, Clock, Target, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components";

interface Props {
  achievements: number;
  hours: number;
  coursescompleted: number;
  coursesinprogress: number;
}

export default function ProfileStats({
  achievements,
  hours,
  coursescompleted,
  coursesinprogress,
}: Props) {
  const stats = [
    { icon: Trophy, label: "Logros", value: achievements },
    { icon: Clock, label: "Horas de estudio", value: hours },
    { icon: Target, label: "Cursos completados", value: coursescompleted },
    { icon: BookOpen, label: "Cursos en progreso", value: coursesinprogress },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-neutral-900 p-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-none rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 dark:bg-neutral-800 text-center"
        >
          <CardContent className="p-6 flex flex-col items-center">
            <div className="bg-primaryper/10 dark:bg-primaryper/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="h-8 w-8 text-primaryper" />
            </div>
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-300">
              {stat.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
