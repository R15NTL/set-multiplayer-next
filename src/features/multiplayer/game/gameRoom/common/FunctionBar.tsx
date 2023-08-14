import React from "react";
// Components
import { Button } from "@/components/ui/button";
// Features
import JoinRequests from "@/features/multiplayer/components/JoinRequests";
import RoomMenu from "./RoomMenu";
import Chat from "./Chat";

interface FunctionBarProps {
  handleFindTestSet: () => void;
}

const showTestSet = process.env.NEXT_PUBLIC_SHOW_TEST_SET === "true";

export default function FunctionBar({ handleFindTestSet }: FunctionBarProps) {
  return (
    <div className="flex gap-3 justify-between items-center">
      <div className="flex gap-3 items-center">
        {showTestSet && <Button onClick={handleFindTestSet}>Test</Button>}
        <JoinRequests />
      </div>
      <div className="flex gap-3 items-center">
        <Chat />
        <RoomMenu />
      </div>
    </div>
  );
}
