import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    getInitialPrompt,
    getHorrorPrompt,
    getComedyPrompt,
    getRomancePrompt,
    getFantasyPrompt,
    getSciFiPrompt,
    getAdventurePrompt,
    getDetectivePrompt,
    getWholesomePrompt,
    getCustomPrompt
} from "./prompts.js";
import { ClaudeService } from "./claude.js";
import dotenv from "dotenv";

// Define a type that includes an index signature to satisfy the type checker
type McpHandler = {
    [key: string]: any;
    (args: { input?: { instructions?: string } }): Promise<{
        messages: Array<{
            role: string;
            content: {
                type: string;
                text: string;
            };
        }>;
    }>;
};

// Load environment variables
dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    process.exit(1);
}

// Initialize Claude service
const claudeService = new ClaudeService(ANTHROPIC_API_KEY);

const server = new McpServer({
    name: "story-generator",
    version: "0.0.0",
});

// Helper function to generate stories using Claude
async function generateStoryWithClaude(prompt: string): Promise<string> {
    try {
        return await claudeService.generateStory({
            prompt: prompt,
            temperature: 0.8,
            maxTokens: 6000
        });
    } catch (error) {
        console.error("Error generating story:", error);
        return "Une erreur est survenue lors de la génération de l'histoire.";
    }
}
    
server.prompt(
    "horrorStory",
    `Generate a horror story`,
    (async () => {
        const prompt = getInitialPrompt() + getHorrorPrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "comedyStory",
    `Generate a comedy story`,
    (async () => {
        const prompt = getInitialPrompt() + getComedyPrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "romanceStory",
    `Generate a romance story`,
    (async () => {
        const prompt = getInitialPrompt() + getRomancePrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "fantasyStory",
    `Generate a fantasy story`,
    (async () => {
        const prompt = getInitialPrompt() + getFantasyPrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "sciFiStory",
    `Generate a sci-fi story`,
    (async () => {
        const prompt = getInitialPrompt() + getSciFiPrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "adventureStory",
    `Generate an adventure story`,
    (async () => {
        const prompt = getInitialPrompt() + getAdventurePrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "detectiveStory",
    `Generate a detective story`,
    (async () => {
        const prompt = getInitialPrompt() + getDetectivePrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "wholesomeStory",
    `Generate a wholesome story`,
    (async () => {
        const prompt = getInitialPrompt() + getWholesomePrompt();
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
);

server.prompt(
    "customStory",
    `Generate a story with custom instructions`,
    // Use a properly typed handler function
    (async (args: { input?: { instructions?: string } }) => {
        const customInstructions = args.input?.instructions || "L'histoire sera créée selon tes propres choix.";
        const prompt = getInitialPrompt() + getCustomPrompt(customInstructions);
        const story = await generateStoryWithClaude(prompt);
        
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: story,
                    },
                },
            ],
        };
    }) as McpHandler as any,
    {
        parameters: {
            type: "object",
            properties: {
                instructions: {
                    type: "string",
                    description: "Custom instructions for generating the story",
                },
            },
        },
    } as any
);

const transport = new StdioServerTransport();
await server.connect(transport);