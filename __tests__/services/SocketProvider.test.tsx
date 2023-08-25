import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import SocketProvider, {
  SocketContext,
  SocketContextProviderValue,
} from "@/services/socket/SocketProvider";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { useGetAccount } from "@/services/queries/account";
import { paths } from "@/routes/paths";

jest.mock("socket.io-client", () => ({
  io: jest.fn().mockReturnValue({
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  }),
}));
jest.mock("@/components/ui/use-toast");
jest.mock("@/services/queries/account");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock implementations
const mockIo = io as jest.MockedFunction<typeof io>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockUseGetAccount = useGetAccount as jest.MockedFunction<
  typeof useGetAccount
>;

// Helpers
const triggerEvent = (socket: any, event: string, ...args: any[]) => {
  const eventHandler = socket.on.mock.calls.find(
    (call: any[]) => call[0] === event
  );

  if (!eventHandler)
    throw new Error(`No event handler found for event ${event}`);

  eventHandler[1](...args);
};

describe("SocketProvider", () => {
  beforeEach(() => {
    mockUseToast.mockReturnValue({
      toast: jest.fn(),
    } as any);

    mockUseRouter.mockReturnValue({
      pathname: "/",
      replace: jest.fn(),
    } as any);

    mockUseGetAccount.mockReturnValue({ user_id: "1" } as any);

    jest.clearAllMocks();
  });

  it("initializes with correct state", () => {
    let contextValue: SocketContextProviderValue | undefined;

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    expect(contextValue?.isConnected).toBe(false);
    expect(contextValue?.lobbyRooms).toEqual([]);
    expect(contextValue?.currentRoom).toBeNull();
  });

  test("connects when pathname starts with multiplayer", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    waitFor(() => {
      expect(contextValue?.isConnected).toBe(true);
      expect(contextValue?.socket.connect).toHaveBeenCalled();
    });
  });

  test("disconnects when pathname does not start with multiplayer", () => {
    let contextValue: SocketContextProviderValue | undefined;

    // Connect first
    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    waitFor(() => {
      expect(contextValue?.isConnected).toBe(true);
      expect(contextValue?.socket.connect).toHaveBeenCalled();
    });

    // Disconnect
    act(() => {
      mockUseRouter.mockReturnValue({
        pathname: "/",
        replace: jest.fn(),
      } as any);
    });

    waitFor(() => {
      expect(contextValue?.isConnected).toBe(false);
      expect(contextValue?.socket.disconnect).toHaveBeenCalled();
    });
  });

  test("forwards user to game room upon receiving room", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    const mockRoom = {
      room_id: "room-1",
    };

    act(() => {
      triggerEvent(contextValue!.socket, "receive-room", mockRoom);
    });

    waitFor(() => {
      expect(contextValue?.currentRoom).toEqual(mockRoom);
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.game.root
      );
    });
  });

  it("sets room to null when user is disconnected", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    const mockRoom = {
      room_id: "room-1",
    };

    act(() => {
      triggerEvent(contextValue!.socket, "receive-room", mockRoom);
    });

    waitFor(() => {
      expect(contextValue?.currentRoom).toEqual(mockRoom);
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.game.root
      );
    });

    act(() => {
      triggerEvent(contextValue!.socket, "disconnect");
    });

    waitFor(() => {
      expect(contextValue?.currentRoom).toBeNull();
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.lobby.root
      );
    });
  });

  test("join request should be true when join request triggered", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    act(() => {
      triggerEvent(contextValue!.socket, "added-to-join-requests");
    });

    waitFor(() => {
      expect(contextValue?.joinRequest).toEqual(true);
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.lobby.joinRequest
      );
    });
  });

  test("join request should be false when user navigates away from join request page", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    act(() => {
      triggerEvent(contextValue!.socket, "added-to-join-requests");
    });

    // Join request should be true
    waitFor(() => {
      expect(contextValue?.joinRequest).toEqual(true);
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.lobby.joinRequest
      );
    });

    act(() => {
      mockUseRouter.mockReturnValue({
        pathname: paths.multiplayer.lobby.joinRequest,
        replace: jest.fn(),
      } as any);
    });

    waitFor(() => {
      expect(contextValue?.joinRequest).toEqual(true);
    });

    // Navigate away from join request page
    act(() => {
      mockUseRouter.mockReturnValue({
        pathname: "/multiplayer/lobby",
        replace: jest.fn(),
      } as any);
    });

    waitFor(() => {
      expect(contextValue?.joinRequest).toEqual(false);
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.lobby.root
      );
    });
  });

  test("receive-rooms should update lobby rooms", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    const mockRooms = [
      {
        room_id: "room-1",
      },
      {
        room_id: "room-2",
      },
    ];

    act(() => {
      triggerEvent(contextValue!.socket, "receive-rooms", mockRooms);
    });

    waitFor(() => {
      expect(contextValue?.lobbyRooms).toEqual(mockRooms);
    });
  });

  test("error should trigger toast", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    const mockError = {
      message: "Error",
    };

    act(() => {
      triggerEvent(contextValue!.socket, "error", mockError);
    });

    waitFor(() => {
      expect(mockUseToast().toast).toHaveBeenCalledWith({
        title: "Error",
        description: "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  });

  test("removed-from-room should set room to null and not show toast if removedByHost is false", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    const mockRoom = {
      room_id: "room-1",
    };

    act(() => {
      triggerEvent(contextValue!.socket, "receive-room", mockRoom);
    });

    waitFor(() => {
      expect(contextValue?.currentRoom).toEqual(mockRoom);
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.game.root
      );
    });

    act(() => {
      mockUseRouter.mockReturnValue({
        pathname: paths.multiplayer.game.root,
        replace: jest.fn(),
      } as any);

      triggerEvent(contextValue!.socket, "removed-from-room", {
        removed_by_host: false,
      });
    });

    waitFor(() => {
      expect(contextValue?.currentRoom).toBeNull();
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.lobby.root
      );
      expect(mockUseToast().toast).not.toHaveBeenCalled();
    });
  });

  test("removed-from-room should set room to null and show toast if removedByHost is true", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    const mockRoom = {
      room_id: "room-1",
    };

    act(() => {
      triggerEvent(contextValue!.socket, "receive-room", mockRoom);
    });

    waitFor(() => {
      expect(contextValue?.currentRoom).toEqual(mockRoom);
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.game.root
      );
    });

    act(() => {
      mockUseRouter.mockReturnValue({
        pathname: paths.multiplayer.game.root,
        replace: jest.fn(),
      } as any);

      triggerEvent(contextValue!.socket, "removed-from-room", {
        removed_by_host: true,
      });
    });

    waitFor(() => {
      expect(contextValue?.currentRoom).toBeNull();
      expect(useRouter().replace).toHaveBeenCalledWith(
        paths.multiplayer.lobby.root
      );
      expect(mockUseToast().toast).toHaveBeenCalled();
    });
  });

  test("socket.on and socket.off with the same amount of values", () => {
    let contextValue: SocketContextProviderValue | undefined;

    mockUseRouter.mockReturnValue({
      pathname: "/multiplayer",
      replace: jest.fn(),
    } as any);

    render(
      <SocketProvider>
        <SocketContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    // Trigger the socket useEffect
    act(() => {
      contextValue!.socket = {
        ...contextValue!.socket,
        hello: "world",
      } as any;
    });

    waitFor(() => {
      const onSet = new Set();
      const offSet = new Set();
      (contextValue!.socket.on as any).mock.calls.forEach((call: any[]) => {
        onSet.add(call[0]);
      });
      (contextValue!.socket.off as any).mock.calls.forEach((call: any[]) => {
        offSet.add(call[0]);
      });
      expect(onSet.size).toEqual(offSet.size);
    });
  });
});
