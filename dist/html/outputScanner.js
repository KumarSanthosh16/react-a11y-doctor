import path from "path";
import fs from "fs";
export function detectOutputDirs(root) {
    const targets = [
        ".next/server/app",
        ".next/server/pages",
        "dist",
        "build",
        "public/build"
    ];
    return targets
        .map(dir => path.join(root, dir))
        .filter(dir => fs.existsSync(dir));
}
