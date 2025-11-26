import * as t from "@babel/types";
import { hasAttribute, addAttribute } from "../utils/fileUtils.js";
import { guessLabel } from "../utils/guessLabel.js";
export function fixClickable(tag, path) {
    if (!["div", "span"].includes(tag))
        return;
    const hasOnClick = path.node.attributes.some((attr) => {
        return attr.name?.name === "onClick";
    });
    if (!hasOnClick)
        return;
    // role="button"
    if (!hasAttribute(path, "role")) {
        addAttribute(path, "role", "button");
    }
    // tabIndex=0
    if (!hasAttribute(path, "tabIndex")) {
        path.node.attributes.push(t.jsxAttribute(t.jsxIdentifier("tabIndex"), t.jsxExpressionContainer(t.numericLiteral(0))));
    }
    // aria-label if missing
    if (!hasAttribute(path, "aria-label")) {
        const label = guessLabel(path);
        addAttribute(path, "aria-label", label);
    }
}
