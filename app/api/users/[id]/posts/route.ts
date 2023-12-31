import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextApiRequest } from "next";

type Params = {
  params: { id: string };
};

export const GET = async (req: NextApiRequest, { params }: Params) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
