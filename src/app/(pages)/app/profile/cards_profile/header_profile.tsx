import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Badge,
} from "@/components";

interface Props {
  name: string;
  role: string;
  company: string;
  email: string;
  image?: string;
  level: number;
  xp: number;
}

export default function ProfileHeader({
  name,
  role,
  company,
  email,
  image,
  level,
  xp,
}: Props) {
  return (
    <Card className="overflow-hidden border-none bg-white dark:bg-neutral-900 transition-colors duration-200">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32  border-primaryper/20">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="text-3xl sm:text-4xl bg-primaryper text-white">
              FA
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {name}
              </h1>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {role}
                </span>
                <span className="hidden sm:inline-block text-gray-400 dark:text-gray-500">•</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {company}
                </span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {email}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-primaryper/5 dark:bg-primaryper/10 text-primaryper px-3 py-1.5 rounded-lg">
                <svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <span className="font-medium">{xp} XP</span>
              </div>
              <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Próximo nivel en {100 - (xp % 100)} XP
              </div>
            </div>

            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
              <div 
                className="bg-primaryper h-2 rounded-full transition-all duration-300"
                style={{ width: `${(xp % 100)}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
