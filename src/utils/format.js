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
    return text; // TODO: MD to HTML
}