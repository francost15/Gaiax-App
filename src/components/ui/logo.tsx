import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="flex items-center text-2xl font-semibold">
      <Link href="/app" passHref>
        <Image src="/logoPlanoSL.svg" alt="Logo" width={50} height={50} />
      </Link>
    </div>
  );
};
