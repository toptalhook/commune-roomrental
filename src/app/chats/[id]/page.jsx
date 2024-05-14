"use client";

import React, { Suspense, useEffect, useState, useTransition } from "react";

import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import Identicon from "react-identicons";

import { setGlobalState, useGlobalState, truncate } from "@/store";
import {
  getMessages,
  sendMessage,
  listenForMessage,
  isUserLoggedIn,
} from "@/Chat";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SpinnerMini from "@/components/Loader";
import toast from "react-hot-toast";

// interface IParams {
//   id: string;
// }

const Chats = ({ params: { id } }) => {
  const [messages] = useGlobalState("messages");
  const [message, setMessage] = useState("");

  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      await isUserLoggedIn()
        .then(async () => {
          await getMessages(id).then((msgs) =>
            setGlobalState("messages", msgs)
          );
          await handleListener();
        })
        .catch((error) => {
          if (error.code == "USER_NOT_LOGED_IN") {
            router.push("/");
            toast.error("You must be logged in first");
          }
        });
    };
    init();
  }, []);

  const onSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(id, message).then((msg) => {
      setGlobalState("messages", (prevState) => [...prevState, msg]);
      setMessage("");
      scrollToEnd();
    });
  };

  const handleListener = async () => {
    await listenForMessage(id).then((msg) => {
      setGlobalState("messages", (prevState) => [...prevState, msg]);
      scrollToEnd();
    });
  };

  const scrollToEnd = () => {
    const elmnt = document.getElementById("messages-container");
    elmnt.scrollTop = elmnt.scrollHeight;
  };

  return (
    <section className="main-container">
      <Heading title="Chats" subtitle="" backBtn />
      <div className=" mt-8 md:mt-10 ">
        <div
          className="bg-gray-100 rounded-2xl h-[calc(100vh_-_13rem)]
    w-4/5 flex flex-col justify-between relative mx-auto mt-8 border-t border-t-gray-100"
        >
          <h1
            className="text-2xl font-bold text-center absolute top-0
      bg-white w-full shadow-sm py-2"
          >
            Chats
          </h1>
          <div
            id="messages-container"
            className="h-[calc(100vh_-_20rem)] overflow-y-scroll w-full p-4 pt-16"
          >
            {messages.length > 0
              ? messages.map((msg, index) => (
                  <Message
                    message={msg.text}
                    uid={msg.sender.uid}
                    key={index}
                  />
                ))
              : "No message yet"}
          </div>
          <form onSubmit={onSendMessage} className="w-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-full w-full py-5 focus:outline-none focus:ring-0 rounded-md
          border-none bg-[rgba(0,0,0,0.7)] text-white placeholder-white"
              placeholder="Leave a message..."
            />
          </form>
        </div>
      </div>
    </section>
  );
};

const Message = ({ message, uid }) => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  return uid == connectedAccount ? (
    <div className="flex justify-end items-center space-x-4 mb-3">
      <div
        className="flex flex-col bg-white py-2 px-4 space-y-2
      rounded-full rounded-br-none shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <Identicon
            string={uid}
            size={20}
            className="rounded-full bg-white shadow-sm"
          />
          <p className="font-bold text-sm">{truncate(uid, 4, 4, 11)}</p>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  ) : (
    <div className="flex justify-start items-center space-x-4 mb-3">
      <div
        className="flex flex-col bg-white py-2 px-4 space-y-2
      rounded-full rounded-bl-none shadow-sm"
      >
        <div className="flex items-center space-x-2">
          <Identicon
            string={uid}
            size={20}
            className="rounded-full bg-white shadow-sm"
          />
          <p className="font-bold text-sm">{truncate(uid, 4, 4, 11)}</p>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Chats;
