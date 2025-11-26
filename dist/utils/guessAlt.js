export function guessAlt(srcAttr) {
    if (!srcAttr || !srcAttr.value)
        return "image";
    const raw = srcAttr.value.value || "";
    // Example: /assets/user-profile.png → user profile
    const file = raw.split("/").pop() || "";
    const withoutExt = file.replace(/\.[^/.]+$/, ""); // remove extension
    const clean = withoutExt.replace(/[-_]/g, " ").trim();
    if (!clean)
        return "image";
    // Capitalize first letter
    return clean.charAt(0).toUpperCase() + clean.slice(1);
}
