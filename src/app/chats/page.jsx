"use client";

import { useEffect } from "react";
import { getConversations } from "@/Chat";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { setGlobalState, useGlobalState, truncate } from "@/store";
import Identicon from "react-identicons";
import toast from "react-hot-toast";

const RecentConversations = () => {
  const router = useRouter();

  const [recentConversations] = useGlobalState("recentConversations");

  useEffect(() => {
    const init = async () =>
      await getConversations()
        .then((users) => setGlobalState("recentConversations", users))
        .catch((error) => {
          if (error.code == "USER_NOT_LOGED_IN") {
            router.push("/");
            toast.error("You should login first...");
          }
        });
    init();
  }, []);

  return (
    <div className="w-full sm:w-3/5 mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center">Your Recent chats</h1>
      {recentConversations?.length > 0
        ? recentConversations?.map((conversation, index) => (
            <Link
              className="flex items-center space-x-3 w-full my-3
              border-b border-b-gray-100 p-3 bg-gray-100"
              href={`/chats/${conversation.conversationWith.uid}`}
              key={index}
            >
              <Identicon
                className="rounded-full shadow-gray-500 shadow-sm bg-white"
                string={conversation.conversationWith.uid}
                size={20}
              />
              <p>{truncate(conversation.conversationWith.name, 4, 4, 11)}</p>
            </Link>
          ))
        : "you don't have any recent chats"}
    </div>
  );
};

export default RecentConversations;
