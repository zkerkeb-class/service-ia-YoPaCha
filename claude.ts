import Anthropic from '@anthropic-ai/sdk';

// Define interfaces for working with Claude's API
export interface StoryOptions {
    prompt: string;
    maxTokens?: number;
    temperature?: number;
    model?: string;
}

// Custom interface for Claude's response content
interface TextContent {
    type: 'text';
    text: string;
}

interface ImageContent {
    type: 'image';
    source: {
        type: string;
        data: string;
    };
}

// Union type for different content types
type MessageContent = TextContent | ImageContent;

export class ClaudeService {
    private client: Anthropic;
    
    constructor(apiKey: string) {
        this.client = new Anthropic({
            apiKey: apiKey
        });
    }

    async generateStory(options: StoryOptions): Promise<string> {
        const { prompt, maxTokens = 4000, temperature = 0.7, model = "claude-3-opus-20240229" } = options;
        
        try {
            const response = await this.client.messages.create({
                model: model,
                max_tokens: maxTokens,
                temperature: temperature,
                system: "Tu es un écrivain français qui génère des histoires créatives en français. Lorsqu'on te demande une histoire, utilise des phrases élaborées et riches en détails pour raconter une histoire immersive et captivante. N'hésite pas à utiliser des tournures complexes et des descriptions élaborées pour créer de la profondeur.",
                messages: [
                    { role: "user", content: prompt }
                ]
            });
            
            // Safely extract text from the response
            if (response.content && response.content.length > 0) {
                const content = response.content[0] as MessageContent;
                if (content.type === 'text') {
                    return content.text;
                }
            }
            
            // Return a default message if text extraction fails
            return "Je n'ai pas pu générer une histoire. Veuillez réessayer.";
        } catch (error) {
            console.error("Error generating story with Claude:", error);
            throw new Error("Failed to generate story with Claude");
        }
    }
}