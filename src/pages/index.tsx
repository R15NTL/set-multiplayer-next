import React from "react";
// Layout
import MainLayout from "../layouts/mainLayout/MainLayout";
// Components
import MenuButton from "@/features/home/MenuButton";

import IconCircle from "@/features/home/IconCircle";
// Icons
import { Icon } from "@iconify/react";

Index.getLayout = (page: React.ReactNode) => (
  <MainLayout className="px-page-x-padding">{page}</MainLayout>
);

export default function Index() {
  return (
    <div className="py-page-y-padding m-auto flex-1 h-full flex items-center flex-grow">
      <div className="m-auto flex gap-5 flex-col w-full max-w-lg">
        <MenuButton title="Multiplayer" color="multiplayer">
          <IconCircle icon="solar:users-group-two-rounded-bold" />
        </MenuButton>
        <MenuButton color="singleplayer" title="Single player">
          <IconCircle icon="solar:user-bold" />
        </MenuButton>
        <MenuButton color="settings" title="How to play">
          <IconCircle icon="solar:book-bookmark-bold" />
        </MenuButton>
        <div></div>
      </div>
    </div>
  );
}
