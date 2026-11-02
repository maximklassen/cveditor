// Speichert Daten als JSON-Datei
export function downloadJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 4)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

export async function readJsonFile(file) {
    return JSON.parse(await file.text());
}

export function imageToDataUrl(file, maxSize = 400) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(image.width * scale);
            canvas.height = Math.round(image.height * scale);
            canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Das Bild konnte nicht gelesen werden."));
        };
        image.src = url;
    });
}
