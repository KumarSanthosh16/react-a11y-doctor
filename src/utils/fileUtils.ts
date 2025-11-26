import * as t from "@babel/types";

export function hasAttribute(path: any, name: string): boolean {
  return path.node.attributes.some(
    (attr: any) => attr.name && attr.name.name === name
  );
}

export function addAttribute(path: any, name: string, value: string) {

  path.node.attributes.push(
    t.jsxAttribute(t.jsxIdentifier(name), t.stringLiteral(value))
  );
}

export function getAttr(path: any, name: string) {
  return path.node.attributes.find(
    (attr: any) => attr.name && attr.name.name === name
  );
}
