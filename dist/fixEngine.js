import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
const traverse = _traverse.default || _traverse;
import _generate from "@babel/generator";
const generate = _generate.default || _generate;
import * as t from "@babel/types";
import { fixImage } from "./fixers/imageFixer.js";
import { fixButton } from "./fixers/buttonFixer.js";
import { fixClickable } from "./fixers/clickableFixer.js";
import { fixLabel } from "./fixers/labelFixer.js";
import { fixSvg } from "./fixers/svgFixer.js";
import { analyzeHeadingOrder } from "./fixers/headingFixer.js";
export function fixEngine(code) {
    const ast = parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"]
    });
    traverse(ast, {
        JSXOpeningElement(path) {
            const name = path.node.name;
            if (!name || !t.isJSXIdentifier(name))
                return;
            const tag = name.name;
            fixImage(tag, path);
            fixButton(tag, path);
            fixClickable(tag, path);
            fixLabel(tag, path);
            fixSvg(tag, path);
        }
    });
    // Run heading order analysis (warnings printed)
    analyzeHeadingOrder(ast);
    return generate(ast).code;
}
