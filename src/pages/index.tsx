import React from "react";
// Next
import Head from "next/head";
// Layout
import MainLayout from "../layouts/mainLayout/MainLayout";
// Components
import MenuButton from "@/features/home/MenuButton";
import IconCircle from "@/features/home/IconCircle";
// Paths
import { paths } from "@/routes/paths";

Index.getLayout = (page: React.ReactNode) => (
  <MainLayout className="px-page-x-padding">{page}</MainLayout>
);

export default function Index() {
  return (
    <>
      <Head>
        <title>Set Multiplayer</title>
      </Head>
      <div className="py-page-y-padding m-auto flex-1 h-full flex items-center flex-grow">
        <div className="m-auto flex gap-5 flex-col w-full max-w-lg">
          <div className="flex flex-col">
            <MenuButton title="Multiplayer" href={paths.multiplayer.lobby.root}>
              <IconCircle icon="solar:users-group-two-rounded-bold" />
            </MenuButton>
          </div>
          <div className="flex flex-col">
            <MenuButton
              className="single-player"
              href={paths.singlePlayer.root}
              title="Single player"
            >
              <IconCircle icon="solar:user-bold" />
            </MenuButton>
          </div>
          <div className="flex flex-col">
            <MenuButton
              href={paths.howToPlay.root}
              className="settings"
              title="How to play"
            >
              <IconCircle icon="solar:book-bookmark-bold" />
            </MenuButton>
          </div>
        </div>
      </div>
    </>
  );
}
