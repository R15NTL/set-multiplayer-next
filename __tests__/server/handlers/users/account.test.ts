import accountMethods from "@/server/handlers/users/account";
import manageUsers from "@/server/auth/users/manageUsers";
import { createMocks } from "node-mocks-http";

jest.mock("@/server/auth/users/manageUsers", () => ({
  updateUser: jest.fn().mockResolvedValue(true),
}));

const mockUser = {
  uid: "test-user-id",
  displayName: "test-user-name",
  email: "test-user-email",
  emailVerified: true,
};

describe("GET /users/account", () => {
  it("should respond 200 OK when user is successfully retrieved", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await accountMethods.GET(req as any, res as any, mockUser as any);

    const data = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(200);
    expect(data.data.success).toBe(true);
    expect(data.data.data.account.user_id).toBe("test-user-id");
    expect(data.data.data.account.username).toBe("test-user-name");
    expect(data.data.data.account.email).toBe("test-user-email");
    expect(data.data.data.account.email_verified).toBe(true);
  });
});

describe("PUT /users/account", () => {
  it("should respond 200 OK when user is successfully updated", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        username: "test-user-name",
      },
    });
    await accountMethods.PUT(req as any, res as any, mockUser as any);

    const data = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(200);
    expect(data.data.success).toBe(true);
    expect(manageUsers.updateUser).toHaveBeenCalledWith("test-user-id", {
      displayName: "test-user-name",
    });
  });

  it("should respond 400 Bad Request when username is not provided", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {},
    });
    await accountMethods.PUT(req as any, res as any, mockUser as any);

    const data = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(400);
    expect(data.data.success).toBe(false);
    expect(data.data.message).toBe("username is a required field");
  });

  it("should respond 500 Internal Server Error when an unknown error occurs", async () => {
    (manageUsers.updateUser as jest.Mock).mockRejectedValueOnce(
      new Error("test-error")
    );

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        username: "test-user-name",
      },
    });
    await accountMethods.PUT(req as any, res as any, mockUser as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toContain("Error while updating the user.");
  });

  it("should respond 500 Internal Server Error when a user is not provided", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        username: "test-user-name",
      },
    });
    await accountMethods.PUT(req as any, res as any, undefined as any);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toContain(
      "User authorization is not enabled for this request"
    );
  });
});
