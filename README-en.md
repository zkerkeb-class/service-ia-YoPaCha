# Story AI Service

An MCP (Model Context Protocol) service that generates short stories in French using Claude AI.

## Installation

1. Clone the repository:
   ```bash
   git clone [Repository URL]
   cd stories-ai-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Then edit the `.env` file to add your Anthropic Claude API key.

## Usage

To start the server:

```bash
npm run dev
```

You can also use the included scripts to test the functionality:

```bash
# Generate a horror story directly
npx tsx ./scripts/generate-story.ts

# Test all story genres
npx tsx ./scripts/test-all-genres.ts
```

## Features

The service provides story generation in several genres:

- Horror
- Comedy
- Romance
- Fantasy
- SciFi (Science Fiction)
- Adventure
- Detective
- Wholesome
- Custom (allows you to define your own instructions)

## MCP Interface

The service exposes several MCP endpoints to generate different types of stories:

- `horrorStory`: Generates a horror story
- `comedyStory`: Generates a comedy story
- `romanceStory`: Generates a romantic story
- `fantasyStory`: Generates a fantasy story
- `sciFiStory`: Generates a science fiction story
- `adventureStory`: Generates an adventure story
- `detectiveStory`: Generates a detective story
- `wholesomeStory`: Generates a wholesome/heartwarming story
- `customStory`: Generates a story according to custom instructions (parameter: `instructions`)

## Using with the Claude CLI

### Installing with the Claude CLI

To install this MCP service locally and use it with the Claude CLI:

```bash
# In the project directory, run with the user scope parameter :
claude mcp add -s user Stories-AI-Service npx tsx /path/to/service-ia-YoPaCha/main.ts
# Claude will always launch it when executed

# Or in the parent directory with the project scope parameter :
claude mcp add -s project Stories-AI-Service npx tsx /path/to/service-ia-YoPaCha/main.ts
# Make sure that you are currently in a directory that contains the service-ia-YoPaCha and front-YoPaCha directories before either running this command or running Claude
```

### Usage

Once installed, you can use it as follows:

```bash
# To generate a horror story
claude --mcp story-generator horrorStory

# To generate a custom story
claude --mcp story-generator customStory --instructions "The story should be about a quest in a post-apocalyptic world where nature has reclaimed its rights."
```

## Code Structure

- `main.ts`: Main entry point, defines the MCP server and endpoints
- `prompts.ts`: Contains functions that generate prompts for each story genre
- `claude.ts`: Service that interfaces with the Claude API
- `scripts/`: Helper scripts for testing and generating stories directly