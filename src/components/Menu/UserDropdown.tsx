// components/UserDropdown.tsx
"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Session } from "next-auth";
import {
  Heart,
  MessageCircleQuestion,
  MessageCircleMore,
  LogOut,
} from "lucide-react";

const UserDropdown = ({ session }: { session: Session }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  return (
    <div className="relative flex items-center">
      <button onClick={() => setShowDropdown((prev) => !prev)}>
        <Image
          src={session.user.image as string}
          alt="avatar"
          width={40}
          height={40}
          className={"rounded-full relative " + (showDropdown ? "z-50" : "")}
        />
      </button>
      {showDropdown && (
        <>
          <div
            onClick={() => setShowDropdown(false)}
            className="bg-black/10 fixed inset-0 z-40"
          ></div>
          <div className="fixed z-50 bottom-0 right-0 h-96 w-64 bg-white rounded-md text-gray-600 border">
            <div className="flex items-center gap-4 p-4">
              <Image
                src={session.user.image as string}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {session.user.name as string}
                </span>
                <span className="text-sm text-gray-600">
                  {session.user.email as string}
                </span>
              </div>
            </div>
            <button
              onClick={() => router.push("/my-ads")}
              className="flex gap-2 px-9 pt-2 block text-start w-full"
            >
              <Heart />
              Избранное
            </button>
            <button
              onClick={() => router.push("/my-reviews")}
              className="flex gap-2 px-9 pt-2 block text-start w-full"
            >
              <MessageCircleMore />
              Мои отзывы
            </button>
            <button
              onClick={() => router.push("/my-questions")}
              className="flex gap-2 px-9 pt-2 block text-start w-full"
            >
              <MessageCircleQuestion />
              Мои вопросы
            </button>
            <button
              onClick={() => {
                signOut();
                setShowDropdown(false);
              }}
              className="flex gap-2 px-9 pt-3 block w-full text-start"
            >
              <LogOut /> Выйти
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
