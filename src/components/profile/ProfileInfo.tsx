interface ProfileInfoProps {
  name: string;
  role: string;
  company: string;
  email: string;
}

export const ProfileInfo = ({ name, role, company, email }: ProfileInfoProps) => (
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
); 