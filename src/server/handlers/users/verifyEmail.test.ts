import { createMocks } from "node-mocks-http";
import jwt from "jsonwebtoken";
import manageUsers from "@/server/auth/users/manageUsers";
import verifyEmailMethods from "@/server/handlers/users/verifyEmail";

jest.mock("jsonwebtoken");
jest.mock("@/server/auth/users/manageUsers", () => ({
  __esModule: true,
  default: {
    isUserExistsId: jest.fn(),
    updateUser: jest.fn(),
  },
}));
jest.mock("@/utils");

describe("PUT /verifyEmail", () => {
  const mockVerify = jest.fn();
  const mockIsUserExistsId = jest.fn();
  const mockUpdateUser = jest.fn();

  (jwt.verify as jest.Mock).mockImplementation(mockVerify);
  (manageUsers.isUserExistsId as jest.Mock).mockImplementation(
    mockIsUserExistsId
  );
  (manageUsers.updateUser as jest.Mock).mockImplementation(mockUpdateUser);

  beforeEach(() => {
    mockIsUserExistsId.mockResolvedValue({
      emailVerified: false,
      uid: "test-user-id",
    });
    mockVerify.mockReturnValue({
      userID: "test-user-id",
    });
    mockUpdateUser.mockResolvedValue({
      emailVerified: true,
      uid: "test-user-id",
    });
    jest.clearAllMocks();
  });

  test("should respond 400 Bad Request when token field is empty", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        token: "",
      },
    });

    await verifyEmailMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("token is a required field");
  });

  test("should respond 400 Bad Request if token verification fails", async () => {
    mockVerify.mockImplementation(() => {
      throw new Error();
    });

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        token: "test-token",
      },
    });

    await verifyEmailMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("Invalid token.");
  });

  test("should respond 400 Bad Request if user no longer exists", async () => {
    mockIsUserExistsId.mockResolvedValue(false);

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        token: "test-token",
      },
    });

    await verifyEmailMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("User no longer exists.");
  });

  test("should respond 400 Bad Request if user is already verified", async () => {
    mockIsUserExistsId.mockResolvedValue({
      emailVerified: true,
    });

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        token: "test-token",
      },
    });

    await verifyEmailMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("User is already verified.");
  });

  test("should respond 500 Internal Server Error if error while updating the user", async () => {
    mockUpdateUser.mockRejectedValue(new Error());

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        token: "test-token",
      },
    });

    await verifyEmailMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toContain("Error while updating the user.");
  });

  test("should respond 200 OK if email is successfully verified", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        token: "test-token",
      },
    });

    await verifyEmailMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain("User verified.");
  });
});
