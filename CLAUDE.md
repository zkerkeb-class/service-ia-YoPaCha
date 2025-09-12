# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) service that generates short stories in French using Claude AI. The service supports various story genres including horror, comedy, romance, fantasy, sci-fi, adventure, detective, wholesome, and custom stories with user-provided instructions.

## Development Commands

```bash
# Install dependencies
npm install

# Start the server
npm run dev

# Run the server with TypeScript compilation
npx tsx ./main.ts
```

## Configuration

The service requires an Anthropic API key to be set in the `.env` file:

```
ANTHROPIC_API_KEY=your_api_key_here
```

## Architecture

The codebase is organized into three main files:

1. `main.ts`: Entry point that sets up the MCP server with various story generation endpoints. It initializes the Claude service and defines handlers for each story type.

2. `prompts.ts`: Contains prompt generation functions for different story genres. Each function returns a specialized prompt that guides Claude to generate stories with specific characteristics.

3. `claude.ts`: Service that interfaces with Anthropic's Claude API. It handles API communication, error handling, and formats responses from the API.

## MCP Usage

The service is registered as an MCP provider named "story-generator" and can be used with the Claude CLI:

```bash
# Generate a horror story
claude --mcp story-generator horrorStory

# Generate a custom story with instructions
claude --mcp story-generator customStory --instructions "Your custom instructions here"
```