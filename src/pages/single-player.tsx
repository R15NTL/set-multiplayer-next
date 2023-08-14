import React from "react";
// Layout
import MainLayout from "@/layouts/mainLayout/MainLayout";
// Features
import SinglePlayerStatusBar from "@/features/singlePlayer/SinglePlayerStatusBar";
import SinglePlayerTable from "@/features/singlePlayer/SinglePlayerTable";
// Game provider
import SinglePlayerGameProvider from "@/features/singlePlayer/SinglePlayerGameProvider";

SinglePlayer.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default function SinglePlayer() {
  return (
    <SinglePlayerGameProvider>
      <div className="mx-auto w-full max-w-sm flex flex-col gap-3">
        <SinglePlayerStatusBar />
        <SinglePlayerTable />
      </div>
    </SinglePlayerGameProvider>
  );
}
