import fs from "fs";
import path from "path";
import { load } from "cheerio";

export function fixHtmlFile(filePath: string) {
  const html = fs.readFileSync(filePath, "utf8");
  const $ = load(html);

  $("img:not([alt])").each((_, el) => {
    const src = $(el).attr("src") || "";
    const file = src.split("/").pop()?.split(".")[0] || "image";
    const alt = file.replace(/[-_]/g, " ");
    $(el).attr("alt", alt);
  });

  $("svg").each((_, svg) => {
    if ($(svg).find("title").length === 0) {
      $(svg).prepend("<title>icon</title>");
    }
  });

  $("button:not([aria-label])").each((_, btn) => {
    const text = $(btn).text().trim();
    $(btn).attr("aria-label", text || "button");
  });

  $("div[onclick], span[onclick]").each((_, el) => {
    if (!$(el).attr("role")) $(el).attr("role", "button");
    if (!$(el).attr("tabIndex")) $(el).attr("tabIndex", "0");

    const text = $(el).text().trim();
    $(el).attr("aria-label", text || "interactive element");
  });

  fs.writeFileSync(filePath, $.html(), "utf8");
  console.log("[HTML Fixed]", filePath);
}
