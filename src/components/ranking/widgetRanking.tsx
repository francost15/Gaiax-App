import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TrophyIcon as TrophyFilled } from "lucide-react";
import { LearningStyle, User } from "@/interface";

// Mock data for the top 3 in the leaderboard
const topThree: User[] = [
  {
    id: "dfdffd",
    name: "Ana García",
    lastname: "García",

    email: "",
    password: "",
    position: "",

    learningStyle: LearningStyle.Visual,
  },
  {
    id: "dfdffd",
    name: "Ana García",
    lastname: "García",

    email: "",
    password: "",
    position: "",

    learningStyle: LearningStyle.Visual,
  },
];
// ...existing code...
export function RankingWidget() {
  return (
    <Link href="/app/ranking">
      <Card className="border-none bg-gradient-to-br from-primaryper rounded-xl to-[#4F46E5] hover:from-[#5558DD] hover:to-[#4338CA] text-white transition-colors duration-300 cursor-pointer w-full h-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrophyFilled className="h-6 w-6 text-yellow-300" />
              <div>
                <p className="text-xs font-semibold">Tu posición</p>
                <p className="text-2xl font-bold">6°</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs hidden sm:block">
                de {topThree.length + 1}
              </p>
              <p className="text-sm font-semibold hidden sm:block">
                Ver ranking
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
