import { Avatar, AvatarFallback, AvatarImage } from "@/components";

interface ProfileAvatarProps {
  name: string;
  image?: string;
}

export const ProfileAvatar = ({ name, image }: ProfileAvatarProps) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-primaryper/20">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="text-3xl sm:text-4xl bg-primaryper text-white">
        {initial}
      </AvatarFallback>
    </Avatar>
  );
}; 