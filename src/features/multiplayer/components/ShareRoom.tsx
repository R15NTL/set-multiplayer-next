import React, { useState } from "react";
// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// Paths
import { paths } from "@/routes/paths";
// Socket
import { useSocket } from "@/hooks/useSocket";

interface ShareRoomProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ShareRoom({ className, children }: ShareRoomProps) {
  const { currentRoom } = useSocket();

  const [open, setOpen] = useState(false);

  const shareUrl = `${window.location.origin}${paths.multiplayer.lobby.joinRoom.root}?roomId=${currentRoom?.room_id}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join this room for a game of Set with me, using the link below:`,
          url: shareUrl,
        });
      } catch (err) {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button onClick={handleShare}>{children ?? <>Share this room</>}</Button>
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>
              Share this room using the following link
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
