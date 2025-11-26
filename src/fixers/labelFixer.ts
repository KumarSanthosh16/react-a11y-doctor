import * as t from "@babel/types";
import { hasAttribute, addAttribute } from "../utils/fileUtils.js";

export function fixLabel(tag: string, path: any) {
  if (tag !== "label") return;

  if (hasAttribute(path, "htmlFor")) return;

  let next = path.parentPath?.container[path.key + 1];
  if (!next || !t.isJSXElement(next)) return;

  const nextTag = (next.openingElement.name as any)?.name;
  if (nextTag !== "input") return;

  const idAttr = next.openingElement.attributes.find(
    (attr: any) => t.isJSXAttribute(attr) && attr.name && attr.name.name === "id"
  );

  if (!idAttr || !t.isJSXAttribute(idAttr) || !t.isStringLiteral(idAttr.value)) return;

  const id = idAttr.value.value;

  addAttribute(path, "htmlFor", id);
}
