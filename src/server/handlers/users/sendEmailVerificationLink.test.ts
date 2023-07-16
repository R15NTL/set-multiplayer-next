import { createMocks } from "node-mocks-http";
import sendEmailVerificationLinkMethods from "./sendEmailVerificationLink";
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

describe("PUT /verifyEmail", () => {
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

  test("should respond with 400 Bad Request when email field is empty", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "",
      },
    });

    await sendEmailVerificationLinkMethods.POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("email is a required field");
  });

  test("should respond with 400 Bad Request when email has already been verified", async () => {
    mockIsUserExistsEmail.mockImplementation(() =>
      createMockUser({ emailVerified: true })
    );

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "example@example.com",
      },
    });

    await sendEmailVerificationLinkMethods.POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toContain("Email is already verified");
  });

  test("should respond with 500 Internal Server Error when sending the verification email fails", async () => {
    mockSendMail.mockImplementation(
      (options: any, callback: (error: boolean) => void) => {
        callback(true);
      }
    );

    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "example@example.com",
      },
    });

    await sendEmailVerificationLinkMethods.POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toContain("Error while sending verification email");
  });

  test("should respond with 200 OK when verification email is successfully sent", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "email@example.com",
      },
    });

    await sendEmailVerificationLinkMethods.POST(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain("email sent");
  });
});
