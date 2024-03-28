import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="h-[45px] w-[60px] relative hidden md:block ">
      <Image
        src="/images/logo.gif"
        alt="logo"
        fill
        sizes="150px"
        priority
      />
    </Link>
  );
};

export default Logo;