export interface DeleteUserParams {
  clerkId: string;
}

export interface GetChatParams {
  userId: string;
}
export interface UpdateChatParams {
  userId: string;
  chatHistory: IMessage[];
}

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id?: string | undefined;
    } & DefaultSession["user"];
  }
}
