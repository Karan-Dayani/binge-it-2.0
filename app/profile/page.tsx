"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Profile = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    redirect("/");
  }
  return (
    <div>
      <div>{JSON.stringify(session?.user)}</div>
      <div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
};

export default Profile;
