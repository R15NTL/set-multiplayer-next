import React from "react";
// Layout
import MainLayout from "../layouts/mainLayout/MainLayout";
// Components
import MenuButton from "@/features/home/MenuButton";
import ButtonBase from "@/components/button/ButtonBase";
import ButtonContained from "@/components/button/ButtonContained";

Index.getLayout = (page: React.ReactNode) => (
  <MainLayout className="px-page-x-padding">{page}</MainLayout>
);

export default function Index() {
  return (
    <div className="py-page-y-padding m-auto flex-1 h-full flex items-center flex-grow">
      <div className="m-auto flex gap-5 flex-col w-full max-w-lg">
        <MenuButton title="Multiplayer" color="multiplayer">
          <div className=""></div>
        </MenuButton>
        <MenuButton color="singleplayer" title="Single player" />
        <MenuButton color="settings" title="How to play" />
        <div></div>
      </div>
    </div>
  );
}
