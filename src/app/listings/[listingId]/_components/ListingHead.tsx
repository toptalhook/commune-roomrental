import React from "react";
import Image from "next/image";

import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import { getFavorites } from "@/services/favorite";

interface ListingHeadProps {
  title: string;
  country: string | null;
  region: string | null;
  image: string[];
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = async ({
  title,
  country = "",
  region = "",
  image,
  id,
}) => {

  return (
    <>
      <Heading title={title} subtitle={`${region}, ${country}`} backBtn />
      <div
        className={`w-full  bg-gray-100  overflow-hidden  rounded-xl relative transition duration-300 flex gap-x-[10px] h-[70%]`}
      >
        <div className="w-[50%]">

          <Image src={image[0]} width={520} height={520} alt={"picture"} className="w-full h-full" />

        </div>

        <div className="w-[50%]  flex flex-col gap-y-[10px]">
          <div className="w-full flex flex-row gap-x-[10px] h-[50%]">
            <div className="w-[50%] ">
              <Image src={image[1]} width={520} height={520} alt={"picture"} className="w-full h-full" />
            </div>
            <div className="w-[50%]">
              <Image src={image[2]} width={520} height={520} alt={"picture"} className="w-full h-full" />
            </div>
          </div>
          <div className="w-full flex flex-row gap-x-[10px] h-[50%]">
            <div className="w-[50%]">
              <Image src={image[3]} width={520} height={520} alt={"picture"} className="w-full h-full" />
            </div>
            <div className="w-[50%]">
              <Image src={image[4]} width={520} height={520} alt={"picture"} className="w-full h-full" />
            </div>

          </div>

        </div>


      </div>
    </>
  );
};

export default ListingHead;
