#!/usr/bin/env tsx

/**
 * Batch Image Generation Script
 * 
 * This script recursively finds all TypeScript files under the examples/ directory
 * and generates diagrams using diagrams-ts in the same directory as each TypeScript file.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { execSync } from 'child_process';

/**
 * Recursively find all TypeScript files in a directory
 */
async function findTypescriptFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  const items = await fs.readdir(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      files.push(...await findTypescriptFiles(fullPath));
    } else if (stat.isFile() && item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Execute a TypeScript file and generate diagram
 */
function executeTypescriptFile(filePath: string): void {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Processing: ${filePath}`);
  console.log(`${'='.repeat(80)}`);
  
  try {
    // Execute the TypeScript file with tsx from the file's directory
    // This ensures the diagram is generated in the same directory as the source file
    // Using template literal is safe here since fileName comes from fs.readdir
    execSync(`npx tsx ${fileName}`, {
      cwd: dir,
      stdio: 'inherit'
    });
    
    console.log(`✓ Successfully generated diagram for ${fileName}`);
  } catch (error) {
    console.error(`✗ Failed to generate diagram for ${fileName}`);
    console.error(error);
  }
}

/**
 * Main function
 */
async function main() {
  const examplesDir = path.join(__dirname, '..', 'examples');
  
  console.log('Batch Image Generation Script');
  console.log('==============================');
  console.log(`Searching for TypeScript files in: ${examplesDir}\n`);
  
  // Find all TypeScript files
  const tsFiles = await findTypescriptFiles(examplesDir);
  
  if (tsFiles.length === 0) {
    console.log('No TypeScript files found in examples/ directory');
    return;
  }
  
  console.log(`Found ${tsFiles.length} TypeScript file(s):\n`);
  tsFiles.forEach((file, index) => {
    console.log(`  ${index + 1}. ${path.relative(examplesDir, file)}`);
  });
  
  console.log('\nGenerating diagrams...\n');
  
  // Process each file
  for (const file of tsFiles) {
    executeTypescriptFile(file);
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('Batch generation complete!');
  console.log('='.repeat(80));
}

// Run the script
main().catch(console.error);
