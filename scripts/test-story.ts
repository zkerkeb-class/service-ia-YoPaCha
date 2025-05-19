import { exec } from 'child_process';

// Function to execute a command and return a promise with the result
const execCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.warn(`Warning: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

async function main() {
  try {
    console.log("Testing story-generator MCP service...");
    
    // Test generating a horror story
    console.log("\n=== Testing Horror Story Generation ===\n");
    const result = await execCommand('echo \'{"method":"prompts/get","params":{"name":"horrorStory"},"id":1}\' | npx tsx ./main.ts');
    
    // Parse the result to extract the story
    try {
      const response = JSON.parse(result);
      if (response.result && response.result.messages && response.result.messages.length > 0) {
        const storyText = response.result.messages[0].content.text;
        console.log("Generated Horror Story:");
        console.log(storyText);
      } else {
        console.log("Response format was not as expected:", response);
      }
    } catch (parseError) {
      console.error("Failed to parse server response:", parseError);
      console.log("Raw response:", result);
    }
    
  } catch (error) {
    console.error("Test failed:", error);
  }
}

main();