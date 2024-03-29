import { createUpdateChats, getChat } from "@/lib/actions/chat.action";
import { NextRequest } from "next/server";
function delay(ms : number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function POST(req: NextRequest) {
  try {
    const { message, user } = await req.json();
    const userId = JSON.parse(user);

    // Retrieve chat history from the database
    const chatHistory = await getChat({ userId });

    const apiKey = process.env.PERPEX_API;
    await delay(1000); // Adjust the delay time as needed
    // Make the API call to Perplexity.ai
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "be short and concise never use more then 50 words",
          },
          {
            role: "assistant",
            content:
              "you name is Chat Buddy, you are created by mohammad Shahid. You are only to answer with most short answers. ",
          },
          ...chatHistory.map((chat: any) => ({
            role: chat.role,
            content: chat.content,
          })),
          { role: "user", content: message },
        ],
      }),
    });
   
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Parse the API response
    const data = await response.json();
    const assistantResponse = data.choices[0]?.message?.content;

    // Update chat history in the database
    await createUpdateChats({
      userId,
      chatHistory: [
        ...chatHistory,
        { role: "user", content: message },
        { role: "assistant", content: assistantResponse },
      ],
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" });
  }
}
