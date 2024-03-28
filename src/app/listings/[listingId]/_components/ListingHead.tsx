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
        className={`w-full md:h-[420px] sm:h-[280px] bg-gray-100 h-[260px] overflow-hidden  rounded-xl relative transition duration-300 flex gap-x-[10px]`}
      >
        <div className="w-[50%]">
        
          <Image src={image[0]}   layout="fill"  objectFit="cover" alt="Image" className="rounded-t-[7px] w-[150px]" />

        </div>

        {/* <div className="w-[50%] flex flex-col gap-y-[10px]">
          <div className="w-full flex flex-row gap-x-[10px]">
            <div className="w-[50%]">
              <Image imageSrc={image[1]} fill className={`object-cover`} alt={title} />
            </div>
            <div className="w-[50%]">
              <Image imageSrc={image[2]} fill className={`object-cover`} alt={title} />
            </div>

          </div>
          <div className="w-full flex flex-row gap-x-[10px]">
            <div className="w-[50%]">
              <Image imageSrc={image[3]} fill className={`object-cover`} alt={title} />
            </div>
            <div className="w-[50%]">
              <Image imageSrc={image[4]} fill className={`object-cover`} alt={title} />
            </div>

          </div>

        </div> */}


      </div>
    </>
  );
};

export default ListingHead;
