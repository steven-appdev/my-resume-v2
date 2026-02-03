"use client";
import { useSession } from "next-auth/react";
import Header from "../components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-full bg-neutral-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll">
      <Header />
      {children}
    </div>
  );
}
