import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
// Components
import { Toaster } from "@/components/ui/toaster";
// Providers
import { SessionProvider } from "next-auth/react";
import { AxiosProvider } from "@/services/axios/AxiosProvider";
import SocketProvider from "@/services/socket/SocketProvider";
// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Fonts
import { Poppins } from "next/font/google";
// Analytics
import { Analytics } from "@vercel/analytics/react";

// ----------------QueryClient----------------

const queryClient = new QueryClient();

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
    <div className={`dark ${poppins.className}`}>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <AxiosProvider>
            <SocketProvider>
              {getLayout(<Component {...pageProps} />)}
              <Analytics />
              <Toaster />
            </SocketProvider>
          </AxiosProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}
