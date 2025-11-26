import { fixEngine } from "./fixEngine.js";
import prettier from "prettier";
export async function fixFile(code, dryRun) {
    const fixed = fixEngine(code);
    const formatted = await prettier.format(fixed, {
        parser: "babel-ts",
        semi: true,
        singleQuote: true
    });
    return formatted;
}
