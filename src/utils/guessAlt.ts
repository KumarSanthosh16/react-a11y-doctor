export function guessAlt(srcAttr: any): string {
  if (!srcAttr || !srcAttr.value) return "image";

  const raw = srcAttr.value.value || "";

  const file = raw.split("/").pop() || "";
  const withoutExt = file.replace(/\.[^/.]+$/, "");
  const clean = withoutExt.replace(/[-_]/g, " ").trim();

  if (!clean) return "image";
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}
