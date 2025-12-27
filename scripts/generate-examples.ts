#!/usr/bin/env tsx

/**
 * Batch Image Generation Script
 *
 * This script recursively finds all TypeScript files under the examples/ directory
 * and generates diagrams using diagrams-ts in the same directory as each TypeScript file.
 */

import * as fs from "fs/promises";
import * as path from "path";
import { execFileSync } from "child_process";

/**
 * Recursively find all TypeScript files in a directory
 */
async function findTypescriptFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // Recursively search subdirectories
        files.push(...(await findTypescriptFiles(fullPath)));
      } else if (item.isFile() && item.name.endsWith(".ts")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    throw error;
  }

  return files;
}

/**
 * Execute a TypeScript file and generate diagram
 */
function executeTypescriptFile(filePath: string): void {
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath);

  console.log(`\n${"=".repeat(80)}`);
  console.log(`Processing: ${filePath}`);
  console.log(`${"=".repeat(80)}`);

  try {
    // Execute the TypeScript file with tsx from the file's directory
    // This ensures the diagram is generated in the same directory as the source file
    // Using execFileSync with separate arguments to prevent command injection
    execFileSync("npx", ["tsx", fileName], {
      cwd: dir,
      stdio: "inherit",
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
  const examplesDir = path.join(__dirname, "..", "examples");

  console.log("Batch Image Generation Script");
  console.log("==============================");
  console.log(`Searching for TypeScript files in: ${examplesDir}\n`);

  // Check if examples directory exists
  try {
    await fs.access(examplesDir);
  } catch (error) {
    console.error(`Error: Examples directory not found at ${examplesDir}`);
    process.exit(1);
  }

  // Check for command line arguments to filter files
  const args = process.argv.slice(2);
  const filter = args.length > 0 ? args[0] : null;

  // Find all TypeScript files
  let tsFiles = await findTypescriptFiles(examplesDir);

  if (filter) {
    console.log(`Filtering files by: "${filter}"`);
    tsFiles = tsFiles.filter((file) => file.includes(filter));
  }

  if (tsFiles.length === 0) {
    console.log("No matching TypeScript files found in examples/ directory");
    return;
  }

  console.log(`Found ${tsFiles.length} TypeScript file(s):\n`);
  tsFiles.forEach((file, index) => {
    console.log(`  ${index + 1}. ${path.relative(examplesDir, file)}`);
  });

  console.log("\nGenerating diagrams...\n");

  // Process each file
  for (const file of tsFiles) {
    executeTypescriptFile(file);
  }

  console.log("\n" + "=".repeat(80));
  console.log("Batch generation complete!");
  console.log("=".repeat(80));
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
