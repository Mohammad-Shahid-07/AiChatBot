"use server";

import { GetChatParams, UpdateChatParams } from "@/types";
import { connectToDatabase } from "../mongo";
import Chat from "../model/chat.model";

export async function getChat({ userId }: GetChatParams) {
  try {
    connectToDatabase();
    console.log(userId);
    
    const chat = await Chat.findOne({ userId });
    if (!chat) {
      return [];
    }
    return chat.chatHistory;
  } catch (error) {
    console.log(error);
  }
}
export async function createUpdateChats({
  userId,
  chatHistory,
}: UpdateChatParams) {
  try {
    connectToDatabase();

    let chat = await Chat.findOne({ userId });

    if (!chat) {
      chat = await Chat.create({
        userId,
        chatHistory,
        createdAt: Date.now(),
      });
      return;
    }

    chat.chatHistory = chatHistory;
    await chat.save();

    return chat;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteChat(params: GetChatParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = JSON.parse(userId);
    await Chat.findOneAndUpdate({ user }, { chatHistory: [] });
  } catch (err) {
    console.log(err);
  }
}
