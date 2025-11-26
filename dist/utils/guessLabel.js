import * as t from "@babel/types";
export function guessLabel(path) {
    const node = path.parentPath.node;
    const children = node.children || [];
    // 1. Prefer inner visible text
    let text = children
        .filter((c) => t.isJSXText(c))
        .map((c) => c.value.trim())
        .join(" ");
    if (text && text.length > 0) {
        return cleanText(text);
    }
    // 2. If inner contains other JSX elements, check for ComponentNameIcon
    const firstChild = children.find((c) => t.isJSXElement(c));
    if (firstChild && t.isJSXElement(firstChild)) {
        const innerName = firstChild.openingElement.name?.name;
        if (innerName && innerName.toLowerCase().includes("icon")) {
            return innerName.replace(/icon/i, "").trim() || "icon";
        }
    }
    // 3. Use element/component name itself
    const tag = path.node.name?.name || "";
    if (tag.toLowerCase().includes("icon")) {
        return tag.replace(/icon/i, "").trim() || "icon";
    }
    // 4. Fallback
    return "interactive element";
}
function cleanText(s) {
    return s.replace(/\s+/g, " ").trim();
}
