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
import { Button, ButtonProps } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// Toasts
import { useToast } from "@/components/ui/use-toast";
// Paths
import { paths } from "@/routes/paths";
// Socket
import { useSocket } from "@/hooks/useSocket";
// Icons
import { Icon } from "@iconify/react";
// Utils
import { cn } from "@/lib/utils";

interface ShareRoomProps {
  children?: React.ReactNode;
  className?: string;
  button?: {
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    hide?: boolean;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ShareRoom({
  className,
  children,
  button,
  open: openProp,
  onOpenChange,
}: ShareRoomProps) {
  const { currentRoom } = useSocket();
  const { toast } = useToast();

  const [openState, setOpenState] = useState(false);

  const open = openProp ?? openState;
  const setOpen = onOpenChange ?? setOpenState;

  const shareUrl = `${window.location.origin}${paths.multiplayer.lobby.joinRoom.root}?roomId=${currentRoom?.room_id}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join this room for a game of Set using the link below:`,
          url: shareUrl,
        });
      } catch (err) {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy to clipboard",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {!button?.hide && (
        <Button
          variant={button?.variant ?? "outline"}
          size={button?.size}
          onClick={handleShare}
          className={cn("", className)}
        >
          {children ?? (
            <>
              <Icon icon="tabler:share" className="w-4 h-4" />
              <span className="ml-2">Share room</span>
            </>
          )}
        </Button>
      )}
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share this room</DialogTitle>
            <DialogDescription>
              Share this room using the following link
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Textarea
              value={shareUrl}
              disabled
              className="disabled:opacity-100 disabled:cursor-text resize-none pr-14"
            />
            <Button
              onClick={handleCopy}
              size="icon"
              variant="outline"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Icon icon="tabler:copy" className="w-5 h-5" />
            </Button>
          </div>

          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
