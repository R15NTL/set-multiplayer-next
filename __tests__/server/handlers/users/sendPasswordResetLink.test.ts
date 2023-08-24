import { createMocks } from "node-mocks-http";
import sendPasswordResetLinkMethods from "../../../../src/server/handlers/users/sendPasswordResetLink";
import { transporter } from "@/server/auth/services/nodeMailer";
import manageUsers from "@/server/auth/users/manageUsers";

jest.mock("jsonwebtoken");
jest.mock("@/server/auth/users/manageUsers", () => ({
  __esModule: true,
  default: {
    isUserExistsEmail: jest.fn(),
    updateUser: jest.fn(),
  },
}));

jest.mock("@/server/auth/services/nodeMailer");

function createMockUser(overrides: any = {}) {
  const user = {
    emailVerified: false,
  };

  return {
    ...user,
    ...overrides,
  };
}

function createMockRequest(bodyOverrides: any = {}) {
  const { req, res } = createMocks({
    method: "POST",
    body: {
      email: "example@example.com",
      ...bodyOverrides,
    },
  });
  return { req, res };
}

describe("POST /sendPasswordResetLink", () => {
  const mockIsUserExistsEmail = jest.fn();
  const mockUpdateUser = jest.fn();
  const mockSendMail = jest.fn();

  (manageUsers.isUserExistsEmail as jest.Mock).mockImplementation(
    mockIsUserExistsEmail
  );
  (manageUsers.updateUser as jest.Mock).mockImplementation(mockUpdateUser);
  (transporter.sendMail as jest.Mock).mockImplementation(mockSendMail);

  beforeEach(() => {
    mockIsUserExistsEmail.mockImplementation(() => createMockUser());
    mockSendMail.mockImplementation(
      (options: any, callback: (error: boolean) => void) => {
        callback(false);
      }
    );
    jest.clearAllMocks();
  });

  // ------------------TESTS--------------------

  test("should respond with 400 Bad Request when email field is empty", async () => {
    const { req, res } = createMockRequest({
      email: "",
    });

    await sendPasswordResetLinkMethods.POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("email is a required field");
  });

  test("should respond with 500 Internal Server Error when sending the password reset email fails", async () => {
    mockSendMail.mockImplementation(
      (options: any, callback: (error: boolean) => void) => {
        callback(true);
      }
    );

    const { req, res } = createMockRequest();

    await sendPasswordResetLinkMethods.POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toContain("Error while sending password reset link");
  });

  test("should respond with 200 OK when verification email is successfully sent", async () => {
    const { req, res } = createMockRequest();

    await sendPasswordResetLinkMethods.POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain("Password reset link sent");
  });
});
