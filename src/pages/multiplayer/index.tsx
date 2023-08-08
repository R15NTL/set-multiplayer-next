import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { paths } from "@/routes/paths";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";

index.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default function index() {
  const router = useRouter();
  useEffect(() => {
    router.replace(paths.multiplayer.lobby.root);
  }, []);

  return <LoadingScreen />;
}
