#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const program = new Command();

program
  .name('envsync')
  .description('A lightning-fast CLI tool to audit and sync environment variables.')
  .version('1.0.0');

program
  .command('audit')
  .description('Audit your .env file against a reference .env.example template')
  .option('-e, --env <path>', 'Path to your .env file', '.env')
  .option('-t, --template <path>', 'Path to your template file', '.env.example')
  .action((options) => {
    const envPath = path.resolve(process.cwd(), options.env);
    const templatePath = path.resolve(process.cwd(), options.template);

    console.log(`\nAuditing environment variables...`);
    console.log(`   Target:   ${options.env}`);
    console.log(`   Template: ${options.template}\n`);

    if (!fs.existsSync(templatePath)) {
      console.error(`Error: Template file not found at ${templatePath}`);
      process.exit(1);
    }

    if (!fs.existsSync(envPath)) {
      console.error(`Error: Target .env file not found at ${envPath}`);
      process.exit(1);
    }

    const parseEnvFile = (filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const vars = {};
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIndex = trimmed.indexOf('=');
          if (eqIndex !== -1) {
            const key = trimmed.substring(0, eqIndex).trim();
            vars[key] = true;
          }
        }
      });
      return vars;
    };

    const templateVars = parseEnvFile(templatePath);
    const envVars = parseEnvFile(envPath);

    const missing = Object.keys(templateVars).filter((key) => !envVars[key]);
    const extra = Object.keys(envVars).filter((key) => !templateVars[key]);

    if (missing.length === 0 && extra.length === 0) {
      console.log('Success: Your .env file is completely in sync with the template.');
    } else {
      if (missing.length > 0) {
        console.log('Missing variables (present in template, but missing in .env):');
        missing.forEach((k) => console.log(`   - ${k}`));
      }
      if (extra.length > 0) {
        console.log('\nExtra variables (present in .env, but not in template):');
        extra.forEach((k) => console.log(`   + ${k}`));
      }
    }
  });

program.parse();