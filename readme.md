# Unique ID Generator

A TypeScript-based **Unique ID Generator** inspired by **Twitter's Snowflake** algorithm. This generator creates unique, timestamp-based IDs using TypeScript's type system and features:

- 41-bit timestamp (milliseconds since custom epoch) which is 2024-11-12T19:29:28.672Z (1731439768672)
- 5-bit datacenter ID 
- 5-bit machine ID
- 12-bit sequence number

## Features

- Built with **TypeScript** for type safety and better developer experience
- Generates unique 64-bit IDs with timestamp precision
- Implements Twitter's **Snowflake** ID generation algorithm
- Supports **binary** and decimal representations for IDs
- Full **TSDoc** documentation with type definitions
- Automatic sequence number management with per-second reset
- Type-safe configuration options for datacenter and machine IDs

## Getting Started

Follow these instructions to set up the project in your TypeScript environment.

### Prerequisites

You'll need these tools installed:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: Package managers for Node.js
- **TypeScript**: Install globally via `npm install -g typescript`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sadia-hub/unique-id-generator.git
   cd unique-id-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. For development with auto-reload:
   ```bash
   npm start
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Generate documentation:
   ```bash
   npm run generate-docs
   ```

The compiled JavaScript files will be available in the `dist` directory, and documentation will be generated in the `docs` folder.
