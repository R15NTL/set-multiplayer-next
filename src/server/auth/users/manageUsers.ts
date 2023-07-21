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

interface CreateUserProperties {
  email?: string;
  password?: string;
  id?: string;
  emailVerified?: boolean;
  displayName?: string;
  photoURL?: string;
}

interface GoogleUserProfile {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const manageUsers = {
  async createUser({
    email,
    password,
    id,
    displayName,
    emailVerified,
    photoURL,
  }: CreateUserProperties): Promise<UserRecord | false> {
    try {
      const userRecord = await adminAuth.createUser({
        email,
        password,
        uid: id,
        displayName,
        emailVerified,
        photoURL,
      });
      return userRecord;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred.");
    }
  },

  async isUserExistsEmail(email: string): Promise<false | UserRecord> {
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      if (!!userRecord) return userRecord;
      return false;
    } catch (error: any) {
      if (error?.code === "auth/user-not-found") {
        return false;
      }
    }
    throw new Error("An unknown error occurred.");
  },

  async isUserExistsId(uid: string) {
    try {
      const userRecord = await adminAuth.getUser(uid);
      if (!!userRecord) return userRecord;
    } catch (error: any) {
      if (error?.code === "auth/user-not-found") {
        return false;
      }
    }
    throw new Error("An unknown error occurred.");
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

  async generateEmailVerificationLink(email: string): Promise<string> {
    const actionCodeSettings = {
      url: "https://www.example.com/finishSignUp",
      handleCodeInApp: true,
    };

    try {
      const link = await adminAuth.generateEmailVerificationLink(
        email,
        actionCodeSettings
      );
      return link;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("An unknown error occurred.");
    }
  },

  async getOrCreateGoogleUser(profile: GoogleUserProfile) {
    const { picture, name, email } = profile;
    const userExists = await manageUsers.isUserExistsEmail(email);

    if (!!userExists) {
      if (userExists.emailVerified === false) {
        await manageUsers.updateUser(userExists.uid, {
          emailVerified: true,
        });
      }

      return userExists;
    }

    const userRecord = await manageUsers.createUser({
      email: email,
      displayName: name,
      emailVerified: true,
      photoURL: picture,
    });

    if (!userRecord) throw new Error("Unable to create user.");
    return userRecord;
  },

  async getOrCreateAdminUser() {
    const userExists = await manageUsers.isUserExistsId("administator");

    if (!!userExists) return userExists;

    const userRecord = await manageUsers.createUser({
      id: "administator",
      displayName: "Administrator",
      emailVerified: true,
    });

    if (!userRecord) throw new Error("Unable to create user.");
    return userRecord;
  },
};

export default manageUsers;
