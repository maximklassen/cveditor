// "2022-03" oder "2022-03-01" -> "03/2022"
export function formatMonth(value) {
    if (!value) return "";
    const [year, month] = value.split("-");
    return month ? `${month}/${year}` : year;
}

// "https://github.com/name/" -> "github.com/name"
export function shortenUrl(url) {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function parseDescription(text) {
    const blocks = [];
    for (const line of (text ?? "").split("\n")) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith("- ")) {
            const item = trimmed.slice(2);
            const last = blocks[blocks.length - 1];
            if (last?.type === "ul") last.items.push(item);
            else blocks.push({ type: "ul", items: [item] });
        } else {
            blocks.push({ type: "p", text: trimmed });
        }
    }
    return blocks;
}