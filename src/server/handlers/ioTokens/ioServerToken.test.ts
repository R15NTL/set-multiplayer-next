import { createMocks } from "node-mocks-http";
import ioServerTokenMethods from "./ioServerToken";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");

describe("PUT /ioServerToken", () => {
  const mockSign = jest.fn();

  (jwt.sign as jest.Mock).mockImplementation(mockSign);

  beforeEach(() => {
    mockSign.mockReturnValue("test-token");
    jest.clearAllMocks();
  });

  test("should respond 200 OK when token is successfully created", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await ioServerTokenMethods.GET(
      req as any,
      res as any,
      {
        user_id: "test-user-id",
        name: "test-user-name",
      } as any
    );
    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain("Token created successfully.");
    expect(res._getData()).toContain("test-token");
  });
});
