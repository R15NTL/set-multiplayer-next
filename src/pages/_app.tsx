import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
// Providers
import { SessionProvider } from "next-auth/react";
import { AxiosProvider } from "@/services/axios/AxiosProvider";
import SocketProvider from "@/services/sockets/SocketProvider";
// Fonts
import { Poppins } from "next/font/google";
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
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  return (
    <div className={`${poppins.className}`}>
      <AxiosProvider>
        <SocketProvider>
          <SessionProvider session={pageProps.session}>
            {getLayout(<Component {...pageProps} />)}
            <Analytics />
          </SessionProvider>
        </SocketProvider>
      </AxiosProvider>
    </div>
  );
}
