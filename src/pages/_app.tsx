import { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
// Providers

// Fonts
import { Poppins } from "next/font/google";
// Dynamic title

// Analytics
import { Analytics } from "@vercel/analytics/react";

// ----------------Fonts----------------
const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// ----------------Types----------------
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

// -----------------App-----------------
export default function App({ Component, pageProps }: MyAppProps) {
  const [darkMode, setDarkMode] = useState(false);
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  return (
    <div
      className={`${
        darkMode
          ? "dark bg-background-dark  text-text-light"
          : " bg-background-light text-text-dark"
      } h-full w-full 
     
      
      ${poppins.className} font-light
      `}
    >
      {getLayout(<Component {...pageProps} />)}

      <Analytics />
    </div>
  );
}
