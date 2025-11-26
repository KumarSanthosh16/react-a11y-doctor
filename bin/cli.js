#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fixFile } from "../dist/index.js";
import { fixHtmlFile } from "../dist/html/htmlFixEngine.js";
import { detectOutputDirs } from "../dist/html/outputScanner.js";

const mode = process.argv[2];
const target = path.resolve(process.cwd(), process.argv[3] || "src");

async function processFile(file) {
  const original = fs.readFileSync(file, "utf8");
  const fixed = await fixFile(original, false);
  fs.writeFileSync(file, fixed, "utf8");
  console.log("✔ Fixed:", file);
}

async function walk(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.lstatSync(full);

    if (stat.isDirectory()) {
      await walk(full);
    } else if (/\.(jsx?|tsx?)$/.test(full)) {
      await processFile(full);
    }
  }
}

async function fixOutputHtml(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.lstatSync(full);

    if (stat.isDirectory()) {
      await fixOutputHtml(full);
    } else if (/\.html?$/.test(full)) {
      fixHtmlFile(full);
    }
  }
}

// MAIN EXECUTION
if (mode === "auto") {
  console.log("🔍 Detecting output build directories...");
  const dirs = detectOutputDirs(process.cwd());

  for (const d of dirs) {
    console.log("📦 Processing output:", d);
    await fixOutputHtml(d);
  }

  console.log("🔧 Fixing source directory: src");
  await walk("src");

  console.log("🎉 Auto fix completed!");
  process.exit(0);
}

if (mode === "fix") {
  console.log("🔧 Running source fix on:", target);
  await walk(target);
  console.log("🎉 Fix completed!");
  process.exit(0);
}

console.error("Usage: react-a11y-doctor <fix|auto> <dir>");
