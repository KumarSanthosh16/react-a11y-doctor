import * as t from "@babel/types";
export function guessLabel(path) {
    const node = path.parentPath.node;
    const children = node.children || [];
    let text = children
        .filter((c) => t.isJSXText(c))
        .map((c) => c.value.trim())
        .join(" ");
    if (text && text.length > 0) {
        return cleanText(text);
    }
    const firstChild = children.find((c) => t.isJSXElement(c));
    if (firstChild && t.isJSXElement(firstChild)) {
        const innerName = firstChild.openingElement.name?.name;
        if (innerName && innerName.toLowerCase().includes("icon")) {
            return innerName.replace(/icon/i, "").trim() || "icon";
        }
    }
    const tag = path.node.name?.name || "";
    if (tag.toLowerCase().includes("icon")) {
        return tag.replace(/icon/i, "").trim() || "icon";
    }
    return "interactive element";
}
function cleanText(s) {
    return s.replace(/\s+/g, " ").trim();
}
