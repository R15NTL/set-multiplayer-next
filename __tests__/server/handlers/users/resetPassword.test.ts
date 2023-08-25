import { createMocks } from "node-mocks-http";
import jwt from "jsonwebtoken";
import manageUsers from "@/server/auth/users/manageUsers";
import resetPasswordMethods from "../../../../src/server/handlers/users/resetPassword";

jest.mock("jsonwebtoken");
jest.mock("@/server/auth/users/manageUsers", () => ({
  __esModule: true,
  default: {
    isUserExistsId: jest.fn(),
    updateUser: jest.fn(),
  },
}));
jest.mock("@/utils");

function createMockRequest(bodyOverrides: any = {}) {
  const { req, res } = createMocks({
    method: "PUT",
    body: {
      password: "test-password",
      confirm_password: "test-password",
      token: "test-token",
      ...bodyOverrides,
    },
  });
  return { req, res };
}

describe("PUT /resetPassword", () => {
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
      purpose: "password-reset",
      userID: "test-user-id",
    });
    mockUpdateUser.mockResolvedValue({
      emailVerified: true,
      uid: "test-user-id",
    });
    jest.clearAllMocks();
  });

  // ------------------TESTS--------------------

  test("should respond 400 Bad Request when token field is empty", async () => {
    const { req, res } = createMockRequest({
      token: "",
    });

    await resetPasswordMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("token is a required field");
  });

  test("should respond 400 Bad Request when password and confirm_password fields do not match", async () => {
    const { req, res } = createMockRequest({
      password: "test-password",
      confirm_password: "test-password2",
    });

    await resetPasswordMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("Passwords must match");
  });

  test("should respond 400 Bad Request if token verification fails", async () => {
    mockVerify.mockImplementation(() => {
      throw new Error();
    });

    const { req, res } = createMockRequest();

    await resetPasswordMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("Invalid token.");
  });

  test("should respond 400 Bad Request if user no longer exists", async () => {
    mockIsUserExistsId.mockResolvedValue(false);

    const { req, res } = createMockRequest();

    await resetPasswordMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("User no longer exists.");
  });

  test("should respond 500 Internal Server Error if error while updating password", async () => {
    mockUpdateUser.mockRejectedValue(new Error());

    const { req, res } = createMockRequest();

    await resetPasswordMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toContain("Error while updating password.");
  });

  test("should respond 200 OK if password is successfully updated", async () => {
    const { req, res } = createMockRequest();

    await resetPasswordMethods.PUT(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain("Password updated.");
  });
});
