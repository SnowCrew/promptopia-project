import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export interface IPrompt {
  userId: string;
  prompt: string;
  tag: string;
}

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = (await req.json()) as IPrompt;

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, tag, prompt });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
