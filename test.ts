import { Client } from "@modelcontextprotocol/sdk/client/index";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function main() {
    try {
        console.log("Starting story-generator service...");
        
        // Start the MCP server in a separate process
        const child = exec("npx tsx ./main.ts");
        
        // Give the server a moment to start
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Creating MCP client...");
        
        // Create a client
        const client = new Client({
            name: "test-client",
            version: "1.0.0"
        });
        
        // Connect using stdio transport
        await client.connect({
            send: async (message) => {
                console.log("Sending message to server:", message);
                // Send message to server
                const { stdout } = await execAsync(`echo '${JSON.stringify(message)}' | npx tsx ./main.ts`);
                console.log("Server response:", stdout);
                return JSON.parse(stdout);
            }
        });
        
        console.log("Connected to story-generator service");
        console.log("Requesting a horror story...");
        
        // Call the horror story prompt
        const response = await client.getPrompt({ name: "horrorStory" });
        
        console.log("Response:", response);
        
        // Terminate the server process
        child.kill();
        
    } catch (error) {
        console.error("Error testing story-generator:", error);
    }
}

main();