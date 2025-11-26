#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fixFile } from "../dist/index.js";

const mode = process.argv[2];
const folder = process.argv[3] || "src";

await walk(folder);


if (!["fix", "dry"].includes(mode)) {
  console.error("Usage: react-a11y-doctor <fix|dry> <directory>");
  process.exit(1);
}

async function processFile(file) {
  const original = fs.readFileSync(file, "utf8");
  const fixed = await fixFile(original, mode === "dry");

  if (mode === "dry") {
    console.log("\n--- DRY RUN:", file, "---\n");
    console.log(fixed);
    return;
  }

  fs.writeFileSync(file, fixed, "utf8");
  console.log("[Fixed]", file);
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

await walk(folder);

