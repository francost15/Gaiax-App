import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/app" passHref>
        <Image src="/logoPlanoSL.svg" alt="Logo" width={120} height={80} />
      </Link>
    </div>
  );
};
