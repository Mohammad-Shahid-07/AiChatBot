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
