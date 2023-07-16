import { requestHandler } from "./handleRequest";
import { authorizeUser } from "../users/authorize";
import { createMocks } from "node-mocks-http";

jest.mock("../users/authorize");

// Types
type methods = "GET" | "POST" | "PUT" | "DELETE";

interface createMockRequestSettings {
  methodsAllowed?: methods[];
  authorize?: boolean;
  method?: methods;
  allowUnverifiedEmail?: boolean;
  createError?: boolean;
}

// Helpers
const mockHandler =
  (createError?: boolean) => async (req: any, res: any, user?: any) => {
    if (createError) {
      throw new Error("test-error");
    }
    res.status(200).json({ message: "success" });
  };

function createMockRequest({
  methodsAllowed = ["GET", "POST", "PUT", "DELETE"],
  authorize = true,
  method = "GET",
  allowUnverifiedEmail = false,
  createError = false,
}: createMockRequestSettings) {
  const { req, res } = createMocks({
    method,
  });

  const handlers = methodsAllowed.reduce(
    (acc, method) => {
      acc[method] = mockHandler(createError);
      return acc;
    },
    {} as Record<methods, any>
  );
  return {
    req,
    res,
    handlers,
    settings: {
      authorize,
      allowUnverifiedEmail,
    },
  };
}

function mockAuthorizeUser(authorize: boolean, overrides: any = {}) {
  if (!authorize) return (authorizeUser as jest.Mock).mockResolvedValue(false);

  (authorizeUser as jest.Mock).mockResolvedValue({
    email_verified: true,
    uid: "test-user-id",
    ...overrides,
  });
}

describe("requestHandler", () => {
  beforeEach(() => {
    mockAuthorizeUser(true);
    jest.clearAllMocks();
  });

  // ------------------TESTS--------------------

  test("should respond 405 Method Not Allowed when method is not available", async () => {
    const { req, res, handlers, settings } = createMockRequest({
      methodsAllowed: ["GET"],
      method: "POST",
    });

    await requestHandler(req as any, res as any, handlers, settings);
    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toContain(`Method ${req.method} Not Allowed`);
  });

  test("should respond 401 Unauthorized when authorize is true and user is not authorized", async () => {
    const { req, res, handlers, settings } = createMockRequest({
      authorize: true,
    });

    mockAuthorizeUser(false);

    await requestHandler(req as any, res as any, handlers, settings);
    expect(res._getStatusCode()).toBe(401);
    expect(res._getData()).toContain("Unauthorized");
  });

  test("should respond 403 Forbidden when user is authorized but email is not verified", async () => {
    const { req, res, handlers, settings } = createMockRequest({});
    mockAuthorizeUser(true, {
      email_verified: false,
      uid: "test-user-id",
    });

    await requestHandler(req as any, res as any, handlers, settings);
    expect(res._getStatusCode()).toBe(403);
    expect(res._getData()).toContain("Email not verified");
  });

  test("should respond 200 OK when authorize is false and user is not authorized", async () => {
    const { req, res, handlers, settings } = createMockRequest({
      authorize: false,
    });

    mockAuthorizeUser(false);

    await requestHandler(req as any, res as any, handlers, settings);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe('{"message":"success"}');
  });

  test("should respond 200 OK when authorize is true and user is authorized and email verified", async () => {
    const { req, res, handlers, settings } = createMockRequest({
      authorize: true,
      allowUnverifiedEmail: false,
    });

    await requestHandler(req as any, res as any, handlers, settings);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe('{"message":"success"}');
  });

  test("should respond 200 OK when user is authorized email not verified but allowUnverifiedEmail is true", async () => {
    const { req, res, handlers, settings } = createMockRequest({
      authorize: true,
      allowUnverifiedEmail: true,
    });

    mockAuthorizeUser(true, {
      email_verified: false,
      uid: "test-user-id",
    });

    await requestHandler(req as any, res as any, handlers, settings);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe('{"message":"success"}');
  });
});
