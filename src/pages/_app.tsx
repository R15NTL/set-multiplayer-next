import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { useRouter } from "next/router";
// Routes
import { paths } from "@/routes/paths";
// Components
import { Toaster } from "@/components/ui/toaster";
// Providers
import { SessionProvider } from "next-auth/react";
import { AxiosProvider } from "@/services/axios/AxiosProvider";
import SocketProvider from "@/services/socket/SocketProvider";
import RoomChatProvider from "@/services/socket/RoomChatProvider";
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

const getThemeColorClass = (pathname: string) => {
  if (pathname.startsWith(paths.singlePlayer.root)) return "single-player";

  return "";
};

// -----------------App-----------------
export default function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  const { pathname } = useRouter();

  return (
    <div
      className={`dark ${getThemeColorClass(pathname)} ${poppins.className}`}
    >
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <AxiosProvider>
            <SocketProvider>
              <RoomChatProvider>
                {getLayout(<Component {...pageProps} />)}
                <Analytics />
                <Toaster />
              </RoomChatProvider>
            </SocketProvider>
          </AxiosProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}
