import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { paths } from "@/routes/paths";

export default function index() {
  const router = useRouter();
  useEffect(() => {
    router.replace(paths.multiplayer.lobby.root);
  }, []);

  return <div>Please wait...</div>;
}
