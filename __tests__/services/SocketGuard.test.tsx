import { useSocket } from "@/hooks/useSocket";
import { render } from "@testing-library/react";
import SocketGuard from "@/services/socket/SocketGuard";

jest.mock("@/hooks/useSocket");

const mockSocket = useSocket as jest.MockedFunction<typeof useSocket>;

const MockChild = () => <div>Mock Child</div>;

describe("SocketGuard", () => {
  it("shows loading screen when socket is not connected", () => {
    mockSocket.mockReturnValue({
      isConnected: false,
    } as any);

    const { queryByText, queryByTestId } = render(
      <SocketGuard>
        <MockChild />
      </SocketGuard>
    );

    expect(queryByText("Mock Child")).toBeNull();
    expect(queryByTestId("loading-screen")).not.toBeNull();
  });

  it("shows children when socket is connected", () => {
    mockSocket.mockReturnValue({
      isConnected: true,
    } as any);

    const { queryByText, queryByTestId } = render(
      <SocketGuard>
        <MockChild />
      </SocketGuard>
    );

    expect(queryByText("Mock Child")).not.toBeNull();
    expect(queryByTestId("loading-screen")).toBeNull();
  });
});
