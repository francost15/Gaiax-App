import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/app" passHref>
        <Image
          src="/logoPlanoSL.svg"
          alt="Logo"
          width={130}
          height={100}
          loading="lazy"
          decoding="async"
          style={{ color: "transparent" }}
        />
      </Link>
    </div>
  );
};
