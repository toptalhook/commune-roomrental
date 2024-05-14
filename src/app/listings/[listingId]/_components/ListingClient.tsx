"use client";
import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { BsChatLeft } from "react-icons/bs";
import Link from "next/link";

import ListingReservation from "./ListingReservation";
import { createReservation } from "@/services/reservation";

import moment from "moment";
import { appartmentReservation } from "@/Blockchain.services";
import { loginWithCometChat, signUpWithCometChat } from "@/Chat";
import { setGlobalState, useGlobalState } from "@/store";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: {
    date: Date;
  }[];
  children: ReactNode;
  id: string;
  title: string;
  price: number;
  user: any;
  owner: any;
}

const ListingClient: React.FC<ListingClientProps> = ({
  price,
  reservations = [],
  children,
  user,
  id,
  title,
  owner,
}) => {
  const [currentUser] = useGlobalState("currentUser");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const [totalPrice, setTotalPrice] = useState(price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.date),
        end: new Date(reservation.date),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && price) {
        setTotalPrice((dayCount + 1) * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, price]);

  const onCreateReservation = () => {
    if (!user) return toast.error("Please log in to reserve listing.");
    startTransition(async () => {
      try {
        const { endDate, startDate } = dateRange;

        const start = moment(startDate);
        const end = moment(endDate);
        const timestampArray = [];

        while (start <= end) {
          timestampArray.push(start.valueOf());
          start.add(1, "days");
        }

        const params = {
          id,
          datesArray: timestampArray,
          amount: price * timestampArray.length,
        };

        await appartmentReservation(params).then(() => {
          router.push("/trips");
          toast.success(`You've successfully reserved "${title}".`);
        });
      } catch (error: any) {
        toast.error(error?.message);
      }
    });
  };

  const handleSignUp = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await signUpWithCometChat()
          .then((user) => {
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      }),
      {
        loading: "Registering...",
        success: "Account created, please login 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  const handleLogin = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await loginWithCometChat()
          .then(async (user) => {
            setGlobalState("currentUser", user);
            resolve(user);
          })
          .catch((error) => reject(error));
      }),
      {
        loading: "Authenticating...",
        success: "Logged in successfully 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
      {children}

      <div className="order-first mb-10 md:order-last md:col-span-3">
        <ListingReservation
          price={price}
          totalPrice={totalPrice}
          onChangeDate={(name, value) => setDateRange(value)}
          dateRange={dateRange}
          onSubmit={onCreateReservation}
          isLoading={isLoading}
          disabledDates={disabledDates}
        />
        <div className="flex mt-2 justify-start items-center space-x-3 border-b-2 border-b-slate-200 pb-6">
          {currentUser ? (
            <Link
              href={`/chats/${owner}`}
              className="p-2 rounded-md shadow-lg border-[0.1px]
          border-gray-300 flex justify-start items-center space-x-1
          bg-white hover:bg-gray-100"
            >
              <BsChatLeft size={15} className="text-pink-500" />
              <small>Chats</small>
            </Link>
          ) : (
            <>
              <button
                className="p-2 rounded-md shadow-lg border-[0.1px]
            border-gray-300 flex justify-start items-center space-x-1
            bg-white hover:bg-gray-100"
                onClick={handleSignUp}
              >
                <small>Sign up</small>
              </button>
              <button
                className="p-2 rounded-md shadow-lg border-[0.1px]
            border-gray-300 flex justify-start items-center space-x-1
            bg-white hover:bg-gray-100"
                onClick={handleLogin}
              >
                <small>Login to chat</small>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
