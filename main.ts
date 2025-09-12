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
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

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
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return `Une erreur est survenue lors de la génération de l'histoire: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
}
    
server.prompt(
    "testHandler",
    `Simple test handler`,
    async () => {
        return {
            messages: [
                {
                    role: "assistant",
                    content: {
                        type: "text",
                        text: "Test handler works! MCP server is functioning correctly.",
                    },
                },
            ],
        };
    },
);

server.prompt(
    "horrorStory", 
    `Generate a horror story`,
    async () => {
        console.log("Horror story handler called");
        try {
            console.log("Creating prompt...");
            const initialPrompt = getInitialPrompt();
            const horrorPrompt = getHorrorPrompt();
            const combinedPrompt = initialPrompt + horrorPrompt;
            console.log("Prompt created, length:", combinedPrompt.length);
            
            console.log("Calling Claude service...");
            const story = await claudeService.generateStory({
                prompt: combinedPrompt,
                temperature: 0.8,
                maxTokens: 6000
            });
            console.log("Story generated successfully, length:", story.length);
            
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
        } catch (error) {
            console.error("Detailed error in horrorStory handler:", error);
            console.error("Error type:", typeof error);
            console.error("Error constructor:", error?.constructor?.name);
            if (error instanceof Error) {
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);
            }
            
            return {
                messages: [
                    {
                        role: "assistant",
                        content: {
                            type: "text",
                            text: `Erreur complète: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`,
                        },
                    },
                ],
            };
        }
    },
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

// Create Express app for HTTP API
const app = express();
app.use(cors());
app.use(express.json());

// Genre mapping for French to English
const genreMapping: { [key: string]: () => string } = {
    'Horreur': () => getInitialPrompt() + getHorrorPrompt(),
    'Comique': () => getInitialPrompt() + getComedyPrompt(),
    'Romance': () => getInitialPrompt() + getRomancePrompt(),
    'Fantasy': () => getInitialPrompt() + getFantasyPrompt(),
    'Science-fiction': () => getInitialPrompt() + getSciFiPrompt(),
    'Aventure': () => getInitialPrompt() + getAdventurePrompt(),
    'Policier': () => getInitialPrompt() + getDetectivePrompt(),
    'Réconfortant': () => getInitialPrompt() + getWholesomePrompt(),
};

// HTTP endpoint for story generation
app.post('/generate-story', async (req, res) => {
    try {
        const { genre } = req.body;
        
        if (!genre || !genreMapping[genre]) {
            return res.status(400).json({ error: 'Genre invalide ou manquant' });
        }
        
        const prompt = genreMapping[genre]();
        const story = await generateStoryWithClaude(prompt);
        
        res.json({ story });
    } catch (error) {
        console.error('Error generating story:', error);
        res.status(500).json({ error: 'Erreur lors de la génération de l\'histoire' });
    }
});

// HTTP endpoint for custom genre story generation
app.post('/generate-custom-story', async (req, res) => {
    try {
        const { instructions } = req.body;
        
        if (!instructions || !instructions.trim()) {
            return res.status(400).json({ error: 'Instructions personnalisées manquantes' });
        }
        
        const prompt = getInitialPrompt() + getCustomPrompt(instructions);
        const story = await generateStoryWithClaude(prompt);
        
        res.json({ story });
    } catch (error) {
        console.error('Error generating custom story:', error);
        res.status(500).json({ error: 'Erreur lors de la génération de l\'histoire personnalisée' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Stories-AI-Service' });
});

// Start HTTP server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`HTTP API server running on port ${PORT}`);
});

// Keep MCP server functionality
const transport = new StdioServerTransport();
await server.connect(transport);