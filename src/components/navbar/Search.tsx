"use client";
import React, { useMemo, useState } from "react";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Modal from "antd/es/modal/Modal";
import { Popover } from "antd";
import SearchCountryModal from "../modals/SearchCountry";

import SearchModal from "../modals/SearchModal";
import SearchDate from "../modals/SearchDate";
import SearchGuest from "../modals/Searchguests";
import { Footer } from "antd/es/layout/layout";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/navigation";

import AnimatedTab from "../Animated tab";

const MENU = [
  { title: "Anywhere" },
  { title: "Anytime" },
  { title: "Add guests"},
];

type dateRange = {
  startDate: Date,
  endDate: Date,
  key: string,
}

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [country, setCountry] = useState(searchParams?.get("country"));
  const [day, setDay] = useState(searchParams?.get("startDate"));
  const [guestCount, setGuestCount] = useState(searchParams?.get("guestCount"));

  const [countryModalShow, setCountryModalShow] = useState(false);
  const [dateModalShow, setDateModalShow] = useState(false);
  const [guestModalShow, setGuestModalShow] = useState(false);

  const guestLabel = guestCount ? `${guestCount} Guests` : "Add Guests";

  const handleCountryClick = () => {
    setCountryModalShow(true);
  }

  const handelDateClick = () => {
    setDateModalShow(true);
  }

  const handleGuestClick = () => {
    setGuestModalShow(true);
  }


  const handleModalCancel = () => {
    setCountryModalShow(false);
    setDateModalShow(false);
    setGuestModalShow(false);
  };

  const handleModalOK = (value: string) => {
    setCountryModalShow(!countryModalShow);
    setCountry(value);
    setGuestModalShow(false);

  }


  const handleDateModalOK = (value: dateRange) => {
    console.log(value.startDate, value.endDate);
    const startday = getDate(value.startDate);
    const endday = getDate(value.endDate);
    const date = `${startday} ~ ${endday}`;
    setDay(date);
    setDateModalShow(false);

  }

  const handleGuestModalOK = (value: number) => {
    console.log(value, "----------------------")
    setGuestCount(`${value}`);
    setGuestModalShow(false)
  }

  const getDate = (date: Date) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const dayIndex = date.getDay();
    const dayName = daysOfWeek[dayIndex];
    const formattedDate = `${dayName}-${month}-${dayOfMonth}`;
    return formattedDate;
  }

  const handleSearch =() => {
   
    router.push(`/listings?country=${country}&startDate=${day}&guestCount=${guestCount}`)

  }


  return (

    <>
      <button
        type="button"
        className="border-[4px] border-pink-400 w-full  rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer bg-white"
      >
        <div className="flex flex-row justify-between items-center py-4">

          <Popover 
            visible={countryModalShow}
            content={<SearchCountryModal onCancel={handleModalCancel} onOK={handleModalOK} />} 
            trigger={"click"}
           >
          <div className="w-[30%]" onClick={handleCountryClick}>
            <small className="text-sm font-bold px-6 text-[#585858] flex items-center justify-between ">
              {country ? country : "Anywhere"}
              {
                country &&  <div onClick={(event) => {event.stopPropagation(); setCountry(null)}} > <MdOutlineCancel/></div>
              }
            </small>
          </div>
          </Popover>


          <div className="w-[30%]" onClick={handelDateClick}>
            <small className="  text-sm font-bold px-6 border-x-[1px] flex items-center justify-between text-center text-[#585858] " >
              {day ? day : "Anytime"}
              {
               day &&  <div onClick={(event) => {event.stopPropagation(); setDay(null)}} > <MdOutlineCancel/></div>
              }
            </small>

          </div>

          <div className="text-sm pl-6 pr-2 text-[#585858] flex flex-row items-center gap-4 w-[40%]" onClick={handleGuestClick}>
            <small className="flex justify-between items-center font-normal text-sm w-[80%] text-[#585858]" >
             {guestLabel}
             {
              guestCount &&  <div onClick={(event) => {event.stopPropagation(); setGuestCount(null)}} > <MdOutlineCancel/></div>
              }

            </small>

            <div className="p-2  bg-rose-500 rounded-full  text-white" onClick={(event) => {event.stopPropagation(); handleSearch()}}>
              <FaSearch className="text-[12px]" />
            </div>
          </div>
        </div>
      </button>

      
      {/* <Modal open={countryModalShow} footer={null} closeIcon={null}>
        <SearchCountryModal onCancel={handleModalCancel} onOK={handleModalOK} />
      </Modal>

      <Modal open={dateModalShow} footer={null} closeIcon={null}>
        <SearchDate onCancel={handleModalCancel} onOK={handleDateModalOK} />
      </Modal>

      <Modal open={guestModalShow} footer={null} closeIcon={null}>
        <SearchGuest onCancel={handleModalCancel} onOK={handleGuestModalOK}/>
      </Modal> */}



    </>

  );
};

export default Search;
