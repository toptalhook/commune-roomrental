import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="h-[40px] w-[80px] relative hidden md:block ">
      <Image
        src="/images/logo.gif"
        alt="logo"
        fill
        sizes="180px"
        priority
      />
    </Link>
  );
};

export default Logo;