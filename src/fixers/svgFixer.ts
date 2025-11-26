import * as t from "@babel/types";
import { guessLabel } from "../utils/guessLabel.js";

export function fixSvg(tag: string, path: any) {
  if (tag !== "svg") return;

  const parent = path.parentPath.node;
  const hasTitle = parent.children.some((c: any) => t.isJSXElement(c) && t.isJSXIdentifier(c.openingElement.name) && c.openingElement.name.name === "title");

  if (hasTitle) return;

  const label = guessLabel(path);

  const title = t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier("title"), []),
    t.jsxClosingElement(t.jsxIdentifier("title")),
    [t.jsxText(label)]
  );

  parent.children.unshift(title);
}
