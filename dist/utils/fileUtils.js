import * as t from "@babel/types";
export function hasAttribute(path, name) {
    return path.node.attributes.some((attr) => attr.name && attr.name.name === name);
}
export function addAttribute(path, name, value) {
    path.node.attributes.push(t.jsxAttribute(t.jsxIdentifier(name), t.stringLiteral(value)));
}
export function getAttr(path, name) {
    return path.node.attributes.find((attr) => attr.name && attr.name.name === name);
}
