import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const promt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(promt), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch prompt", {status: 500});
    }
}

// PATCH (update)
export const PATCH = async ( request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.promt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", {status: 500});
    }
}


// DELETE (delete)
export const DELETE = async ( request, { params }) => {
    try {
        await connectToDB();
        
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt delete successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500});
    }
}