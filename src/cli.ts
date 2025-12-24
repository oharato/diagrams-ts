#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';

interface CliOptions {
  paths: string[];
}

function run(paths: string[]): number {
  /**
   * Run diagrams code files in a diagrams environment.
   * 
   * @param paths - A list of paths to TypeScript/JavaScript files containing diagrams code.
   * @returns The exit code.
   */
  for (const filePath of paths) {
    try {
      const absolutePath = path.resolve(filePath);
      
      if (!fs.existsSync(absolutePath)) {
        console.error(`Error: File not found: ${filePath}`);
        return 1;
      }

      // For TypeScript files, we need to compile them first or use ts-node
      // For JavaScript files, we can require them directly
      const ext = path.extname(filePath);
      
      if (ext === '.ts') {
        console.error('TypeScript files require ts-node or pre-compilation');
        console.error('Please compile TypeScript files first with: npm run build');
        return 1;
      } else if (ext === '.js') {
        // Execute the JavaScript file
        require(absolutePath);
      } else {
        console.error(`Error: Unsupported file type: ${ext}`);
        return 1;
      }
    } catch (error) {
      console.error(`Error executing ${filePath}:`, error);
      return 1;
    }
  }

  return 0;
}

function main(): void {
  program
    .name('diagrams')
    .description('Run diagrams code files in a diagrams environment.')
    .argument('<paths...>', 'JavaScript or TypeScript files containing diagrams code')
    .action((paths: string[]) => {
      const exitCode = run(paths);
      process.exit(exitCode);
    });

  program.parse(process.argv);
}

if (require.main === module) {
  main();
}

export { run, main };
