"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";

import { IoMenu, IoSearchSharp } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { MdLiveTv, MdOutlineCollectionsBookmark } from "react-icons/md";
import { TbUserSquare } from "react-icons/tb";
import { FiHome } from "react-icons/fi";

const Navigation = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="h-16 w-full p-4 bg-header fixed z-99">
        <div className="flex items-center justify-between h-full">
          <h1 className={`text-3xl text-accent-primary font-extrabold`}>
            <Link href={"/"}>BINGE IT 2.0</Link>
          </h1>
          <div className="md:hidden text-2xl text-accent-primary">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <IoMenu className="size-8" />
            </div>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-6 text-lg text-accent-primary">
              <li className="hover:text-accent-primary-hover cursor-pointer">
                <Link href={"/search"} className="flex items-center gap-1">
                  <IoSearchSharp className="size-6" />
                  Search
                </Link>
              </li>
              <li className="hover:text-accent-primary-hover cursor-pointer">
                <Link
                  href={"/movies?page=1"}
                  className="flex items-center gap-1"
                >
                  <BiMoviePlay className="size-6" />
                  Movies
                </Link>
              </li>
              <li className="hover:text-accent-primary-hover cursor-pointer">
                <Link href={"/tvShows"} className="flex items-center gap-1">
                  <MdLiveTv className="size-6" />
                  TV Shows
                </Link>
              </li>
              <li className="hover:text-accent-primary-hover cursor-pointer">
                <Link href={"/collections"} className="flex items-center gap-1">
                  <MdOutlineCollectionsBookmark className="size-6" />
                  Collections
                </Link>
              </li>
              <li className="hover:text-accent-primary-hover cursor-pointer">
                {session ? (
                  <Link href={"/profile"} className="flex items-center gap-1">
                    <TbUserSquare className="size-6" />
                    Profile
                  </Link>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="flex items-center gap-1"
                  >
                    <TbUserSquare className="size-6" />
                    Profile
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={` bg-header z-99 h-screen p-5 mt-16
           fixed w-full ${
             isOpen ? "left-1/2 no-doc-scroll" : "left-full"
           } transition-all duration-300 ease-in-out md:hidden`}
      >
        <ul className="flex flex-col space-y-5 text-lg text-accent-primary">
          <li className="hover:text-accent-primary-hover cursor-pointer">
            <Link
              href={"/search"}
              className="flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              <IoSearchSharp className="size-6" />
              Search
            </Link>
          </li>
          <li className="hover:text-accent-primary-hover cursor-pointer">
            <Link
              href={"/"}
              className="flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              <FiHome className="size-6" />
              Home
            </Link>
          </li>
          <li className="hover:text-accent-primary-hover cursor-pointer">
            <Link
              href={"/movies?page=1"}
              className="flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              <BiMoviePlay className="size-6" />
              Movies
            </Link>
          </li>
          <li className="hover:text-accent-primary-hover cursor-pointer">
            <Link
              href={"/tvShows"}
              className="flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              <MdLiveTv className="size-6" />
              TV Shows
            </Link>
          </li>
          <li className="hover:text-accent-primary-hover cursor-pointer">
            <Link
              href={"/collections"}
              className="flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineCollectionsBookmark className="size-6" />
              Collections
            </Link>
          </li>
          <li className="hover:text-accent-primary-hover cursor-pointer">
            <Link
              href={"/profile"}
              className="flex items-center gap-1"
              onClick={() => setIsOpen(false)}
            >
              <TbUserSquare className="size-6" />
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
