import React, { useEffect } from "react";
// Local
import Header from "../header/Header";
// Auth
import { useSession } from "next-auth/react";

interface MainLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  const session = useSession();

  useEffect(() => {
    console.log({ session });
  }, [session]);
  return (
    <div className={`min-h-screen flex flex-col pt-header-height ${className}`}>
      <Header />
      <main className="flex-grow flex">{children}</main>
    </div>
  );
}
