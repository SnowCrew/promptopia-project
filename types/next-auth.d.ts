import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      name: string;
      email: string;
      id: string | number;
      image: string;
    };
  }
  /** The OAuth profile returned from your provider */
  interface Profile {
    picture?: string;
  }
}
