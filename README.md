# EnvSync

A professional, lightning-fast CLI tool built in Node.js to audit and synchronize environment configuration files against templates. Designed for clean terminal workflows with zero unnecessary overhead.

## Features

- **Audit**: Compare your local .env file against .env.example to instantly identify missing or extra environment variables.
- **Sync**: Automatically patch missing variables into your configuration files.
- **Interactive Mode**: Prompt directly in the terminal to supply values for missing variables on the fly.
- **Zero Heavy Dependencies**: Built cleanly using native Node.js modules and lightweight command parsing.

## Installation

Clone the repository and link it globally for local development:

\\\ash
git clone https://github.com/HammAila/envsync.git
cd envsync
npm install
npm link
\\\

## Usage

### Audit Configuration
Check your current .env file for discrepancies against .env.example:

\\\ash
envsync audit
\\\

### Sync Missing Variables
Append missing variables automatically with empty values:

\\\ash
envsync sync
\\\

### Interactive Sync
Prompt for values of missing variables interactively:

\\\ash
envsync sync --interactive
\\\

## License

MIT License
