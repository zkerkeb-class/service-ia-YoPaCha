import { ClaudeService } from "../claude";
import { getInitialPrompt, getComedyPrompt } from "../prompts";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    process.exit(1);
}

async function main() {
    try {
        console.log("Initializing Claude service...");
        const claudeService = new ClaudeService(ANTHROPIC_API_KEY);
        
        console.log("Generating a story...");
        const prompt = getInitialPrompt() + getComedyPrompt();
        
        const story = await claudeService.generateStory({
            prompt: prompt,
            temperature: 0.8,
            maxTokens: 4000
        });
        
        console.log("\n=== Generated Story ===\n");
        console.log(story);
        console.log("\n=== End of Story ===\n");
        
    } catch (error) {
        console.error("Error generating story:", error);
    }
}

main();