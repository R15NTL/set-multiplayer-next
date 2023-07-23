import React from "react";
// Layout
import MainLayout from "../layouts/mainLayout/MainLayout";
// Components
import MenuButton from "@/features/home/MenuButton";
import IconCircle from "@/features/home/IconCircle";
// Animate
import { motion } from "framer-motion";
// Paths
import { paths } from "@/routes/paths";
// Auth
import EmailVerifiedGuard from "@/features/auth/EmailVerifiedGuard/EmailVerifiedGuard";

// Stagger effect
const buttonVariants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

Index.getLayout = (page: React.ReactNode) => (
  <MainLayout className="px-page-x-padding">
    <EmailVerifiedGuard>{page}</EmailVerifiedGuard>
  </MainLayout>
);

export default function Index() {
  return (
    <motion.div
      className="py-page-y-padding m-auto flex-1 h-full flex items-center flex-grow"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="m-auto flex gap-5 flex-col w-full max-w-lg">
        <motion.div className="flex flex-col" variants={buttonVariants}>
          <MenuButton
            title="Multiplayer"
            color="multiplayer"
            href={paths.multiplayer.root}
          >
            <IconCircle icon="solar:users-group-two-rounded-bold" />
          </MenuButton>
        </motion.div>
        <motion.div className="flex flex-col" variants={buttonVariants}>
          <MenuButton color="singleplayer" title="Single player">
            <IconCircle icon="solar:user-bold" />
          </MenuButton>
        </motion.div>
        <motion.div className="flex flex-col" variants={buttonVariants}>
          <MenuButton color="settings" title="How to play">
            <IconCircle icon="solar:book-bookmark-bold" />
          </MenuButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
