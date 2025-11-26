import babelTraverse from "@babel/traverse";
const traverse = babelTraverse.default;
import * as t from "@babel/types";
export function analyzeHeadingOrder(ast) {
    const headings = [];
    traverse(ast, {
        JSXOpeningElement(path) {
            const tag = path.node.name;
            if (!t.isJSXIdentifier(tag))
                return;
            const name = tag.name;
            if (/^h[1-6]$/.test(name)) {
                headings.push({
                    level: Number(name[1]),
                    loc: path.node.loc?.start
                });
            }
        }
    });
    let last = 1;
    for (const h of headings) {
        if (h.level - last > 1) {
            console.warn(`[a11y-warning] Heading jump from h${last} to h${h.level} at line ${h.loc.line}.`);
        }
        last = h.level;
    }
}
