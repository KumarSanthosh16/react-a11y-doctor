import { hasAttribute, addAttribute } from "../utils/fileUtils.js";
import { guessLabel } from "../utils/guessLabel.js";

export function fixButton(tag: string, path: any) {
  if (tag !== "button") return;

  if (hasAttribute(path, "aria-label")) return;

  const label = guessLabel(path);

  addAttribute(path, "aria-label", label);
}
