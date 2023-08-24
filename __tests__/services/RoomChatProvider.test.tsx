import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import RoomChatProvider, {
  RoomChatContext,
  ChatItem,
} from "@/services/socket/RoomChatProvider";
import { useSocket } from "@/hooks/useSocket";
import { assert } from "console";

jest.mock("@/hooks/useSocket");

jest.useFakeTimers();

const mockSocket = {
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
};

(useSocket as any).mockReturnValue({
  socket: mockSocket,
});

const mockMessage: ChatItem = {
  message_id: "1",
  user_id: "1",
  message: "Hello",
};

describe("RoomChatProvider", () => {
  it("initializes with empty messages", () => {
    let contextValue: any;

    render(
      <RoomChatProvider>
        <RoomChatContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </RoomChatContext.Consumer>
      </RoomChatProvider>
    );

    expect(contextValue.messages).toEqual([]);
  });

  test("Listens for new chat messages and updates them to state", async () => {
    let contextValue: any;

    render(
      <RoomChatProvider>
        <RoomChatContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </RoomChatContext.Consumer>
      </RoomChatProvider>
    );

    // Emit a new chat message
    act(() => {
      contextValue.handleReceiveChatMessage(mockMessage);
    });

    await waitFor(() => {
      expect(contextValue.messages).toEqual([mockMessage]);
    });
  });

  test("Removes chat messages after 3 seconds", async () => {
    let contextValue: any;

    render(
      <RoomChatProvider>
        <RoomChatContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </RoomChatContext.Consumer>
      </RoomChatProvider>
    );

    // Emit a new chat message
    act(() => {
      contextValue.handleReceiveChatMessage(mockMessage);
    });

    await waitFor(() => {
      expect(contextValue.messages).toEqual([mockMessage]);
    });

    // Advance timers by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(contextValue.messages).toEqual([]);
  });

  test("Removes chat messages from the same user", async () => {
    let contextValue: any;

    render(
      <RoomChatProvider>
        <RoomChatContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </RoomChatContext.Consumer>
      </RoomChatProvider>
    );

    const secondMockMessage: ChatItem = {
      message_id: "2",
      user_id: "1",
      message: "Hello2",
    };

    // Emit a new chat message
    act(() => {
      contextValue.handleReceiveChatMessage(mockMessage);
    });

    await waitFor(() => {
      expect(contextValue.messages).toEqual([mockMessage]);
    });

    // Emit a new chat message from the same user
    act(() => {
      contextValue.handleReceiveChatMessage(secondMockMessage);
    });

    await waitFor(() => {
      expect(contextValue.messages).toEqual([secondMockMessage]);
    });
  });
});
