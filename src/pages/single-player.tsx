import React from "react";
// Next
import dynamic from "next/dynamic";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Features
import SinglePlayerStatusBar from "@/features/singlePlayer/SinglePlayerStatusBar";
import SinglePlayerTable from "@/features/singlePlayer/SinglePlayerTable";
import Hint from "@/features/singlePlayer/Hint";
// Game provider
import SinglePlayerGameProvider from "@/features/singlePlayer/SinglePlayerGameProvider";

const DevButton = dynamic(() => import("@/features/singlePlayer/DevButton"));

const DEV_BUTTON_VISIBLE = process.env.NEXT_PUBLIC_SHOW_TEST_SET === "true";

SinglePlayer.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default function SinglePlayer() {
  return (
    <SinglePlayerGameProvider>
      <div className="mx-auto w-full max-w-sm flex flex-col gap-3">
        <SinglePlayerStatusBar />
        <SinglePlayerTable />
        {DEV_BUTTON_VISIBLE && <DevButton />}
      </div>
      <Hint />
    </SinglePlayerGameProvider>
  );
}
