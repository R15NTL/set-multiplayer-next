import { adminAuth } from "../firebase/firebaseInstance";
import { UserRecord } from "firebase-admin/lib/auth";

interface UserProperties {
  disabled?: boolean;
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  password?: string;
  photoURL?: string;
}

const manageUsers = {
  async createUser(email: string, password: string): Promise<UserRecord> {
    try {
      const userRecord = await adminAuth.createUser({
        email,
        password,
      });
      return userRecord;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred.");
    }
  },

  async getUserById(uid: string): Promise<UserRecord> {
    try {
      const userRecord = await adminAuth.getUser(uid);
      return userRecord;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred.");
    }
  },

  async getUserByEmail(email: string): Promise<UserRecord> {
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      return userRecord;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  },

  async updateUser(
    uid: string,
    properties: UserProperties
  ): Promise<UserRecord> {
    try {
      const userRecord = await adminAuth.updateUser(uid, properties);
      return userRecord;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred.");
    }
  },

  async deleteUser(uid: string): Promise<{ message: string }> {
    try {
      await adminAuth.deleteUser(uid);
      return { message: "User deleted successfully" };
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred.");
    }
  },
};

export default manageUsers;
