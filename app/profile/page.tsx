"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return <div className="text-white text-center mt-10">Loading...</div>;
  if (status === "unauthenticated") redirect("/");

  const user = session?.user;

  return (
    <div className="min-h-screen px-4 sm:px-10 py-10 bg-background text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Profile Section */}
        <div className="border border-gray-800 p-6 bg-gray-900">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 relative">
              <Image
                src={user?.image || "/fallback.jpeg"}
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{user?.name}</h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
              <button
                onClick={() => signOut()}
                className="mt-3 px-5 py-1.5 bg-purple-600 hover:bg-purple-700 transition text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Collections Section */}
        <div className="border border-gray-800 p-6 bg-gray-900">
          <h2 className="text-lg font-semibold mb-2">Collections</h2>
          <p className="text-gray-400 text-sm">
            Your saved watchlists or wishlists will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
