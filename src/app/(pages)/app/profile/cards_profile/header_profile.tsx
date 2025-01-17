import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Badge,
  StreakDisplay,
} from "@/components";
interface ProfileData {
  name: string;
  role: string;
  company: string;
  email: string;
  streak: number;
  avatarUrl?: string;
}

const PROFILE_DATA: ProfileData = {
  name: "Franco Alessandro Sanchez Trinidad",
  role: "Desarrollador",
  company: "WimxMovil",
  email: "franco@gmail.com",
  streak: 7,
};

export default function ProfileHeader() {
  return (
    <Card className="overflow-hidden text-white border-none bg-neutral-900">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-[#6366F1]/20">
            <AvatarImage src={PROFILE_DATA.avatarUrl} alt={PROFILE_DATA.name} />
            <AvatarFallback className="text-3xl sm:text-4xl bg-[#6366F1] text-white">
              FA
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl dark:text-white">
                {PROFILE_DATA.name}
              </h1>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center dark:text-neutral-400 text-neutral-700">
                <span>{PROFILE_DATA.role}</span>
                <span className="hidden sm:inline-block">•</span>
                <span>{PROFILE_DATA.company}</span>
              </div>
              <div className="dark:text-neutral-400 text-neutral-700">
                {PROFILE_DATA.email}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <StreakDisplay streak={PROFILE_DATA.streak} />
              <Badge
                variant="outline"
                className="text-black dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-100 dark:text-white hover:bg-neutral-300 dark:border-none"
              >
                Nivel 5
              </Badge>
              <Badge
                variant="outline"
                className="text-black dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-100 dark:text-white hover:bg-neutral-300 dark:border-none"
              >
                1.2k XP
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
