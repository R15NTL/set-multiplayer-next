import { createMocks } from "node-mocks-http";
import jwt from "jsonwebtoken";
import manageUsers from "@/server/auth/users/manageUsers";
import { getEnv } from "@/utils";
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
  (getEnv as jest.Mock).mockReturnValue("test-secret");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if token is not provided", async () => {
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

  test("should return 400 if token is not verified", async () => {
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

  test("should return 400 if user no longer exists", async () => {
    mockIsUserExistsId.mockResolvedValue(false);
    mockVerify.mockReturnValue({
      userID: "test-user-id",
    });

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

  test("should return 400 if user is already verified", async () => {
    mockIsUserExistsId.mockResolvedValue({
      emailVerified: true,
    });
    mockVerify.mockReturnValue({
      userID: "test-user-id",
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

  test("should return 500 if error while updating the user", async () => {
    mockIsUserExistsId.mockResolvedValue({
      emailVerified: false,
      uid: "test-user-id",
    });
    mockVerify.mockReturnValue({
      userID: "test-user-id",
    });
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

  test("should return 200 if user is verified", async () => {
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
