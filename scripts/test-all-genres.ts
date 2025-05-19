import { ClaudeService } from "../claude";
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
} from "../prompts";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    process.exit(1);
}

async function generateStory(claudeService: ClaudeService, genrePrompt: string, genreName: string) {
    console.log(`\n=== Generating ${genreName} Story ===\n`);
    
    try {
        const prompt = getInitialPrompt() + genrePrompt;
        
        // Set a shorter max tokens for testing all genres
        const story = await claudeService.generateStory({
            prompt: prompt,
            temperature: 0.8,
            maxTokens: 1500
        });
        
        console.log(`${genreName} Story Excerpt (first 100 chars):`);
        console.log(story.substring(0, 100) + "...");
        console.log(`\n=== End of ${genreName} Story Excerpt ===\n`);
        
        return true;
    } catch (error) {
        console.error(`Error generating ${genreName} story:`, error);
        return false;
    }
}

async function main() {
    console.log("Initializing Claude service...");
    const claudeService = new ClaudeService(ANTHROPIC_API_KEY);
    
    // Define the genres to test
    const genres = [
        { name: "Horror", prompt: getHorrorPrompt() },
        { name: "Comedy", prompt: getComedyPrompt() },
        { name: "Romance", prompt: getRomancePrompt() },
        { name: "Fantasy", prompt: getFantasyPrompt() },
        { name: "SciFi", prompt: getSciFiPrompt() },
        { name: "Adventure", prompt: getAdventurePrompt() },
        { name: "Detective", prompt: getDetectivePrompt() },
        { name: "Wholesome", prompt: getWholesomePrompt() },
        { name: "Custom", prompt: getCustomPrompt("Une histoire avec un chat qui parle et qui résout des mystères.") }
    ];
    
    // Track test results
    let successes = 0;
    const total = genres.length;
    
    // Test each genre
    for (const genre of genres) {
        const success = await generateStory(claudeService, genre.prompt, genre.name);
        if (success) successes++;
    }
    
    // Report results
    console.log(`\n=== Test Results ===`);
    console.log(`Successfully generated ${successes}/${total} stories`);
    if (successes === total) {
        console.log("All story genres are working correctly!");
    } else {
        console.log("Some story genres failed to generate.");
    }
}

main();