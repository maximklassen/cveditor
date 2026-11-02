import { isValidCv, normalizeCv } from "../state/cvModel";

const STORAGE_KEY = "cv-editor-data";

export function loadCv() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        return isValidCv(data) ? normalizeCv(data) : null;
    } catch {
        return null;
    }
}

export function saveCv(cv) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
    } catch {
        //
    }
}
