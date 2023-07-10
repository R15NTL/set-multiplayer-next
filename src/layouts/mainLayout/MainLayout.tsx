import React from "react";
// Local
import Header from "../header/Header";

interface MainLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col pt-header-height ${className}`}>
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
