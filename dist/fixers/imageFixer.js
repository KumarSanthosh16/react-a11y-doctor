import { hasAttribute, getAttr, addAttribute } from "../utils/fileUtils.js";
import { guessAlt } from "../utils/guessAlt.js";
export function fixImage(tag, path) {
    if (tag !== "img")
        return;
    if (hasAttribute(path, "alt"))
        return;
    const srcAttr = getAttr(path, "src");
    const altValue = guessAlt(srcAttr);
    addAttribute(path, "alt", altValue);
}
