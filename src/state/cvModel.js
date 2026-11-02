export const EMPTY_CONTACT = {
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    behance: "",
    github: [],
};

export const SECTION_TYPES = {
    default: { label: "Klassischer Abschnitt", defaultTitle: "Neuer Abschnitt" },
    certificates: {
        label: "Zertifikate/Weiterbildungen",
        defaultTitle: "Weiterbildungen und Zertifikate",
    },
    skills: { label: "Kenntnisse", defaultTitle: "Kenntnisse" },
};

export function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function createSection(id, type) {
    return {
        id,
        type,
        title: SECTION_TYPES[type].defaultTitle,
        positions: [],
    };
}

export function createPosition(id, sectionType) {
    switch (sectionType) {
        case "skills":
            return { id, title: "", description: "" };
        case "certificates":
            return { id, title: "", organisation: "", start: "", end: "" };
        default:
            return {
                id,
                title: "",
                firm: "",
                location: "",
                start: "",
                end: "",
                description: "",
            };
    }
}

export function createChapter(id) {
    return { id, chapter: true, title: "", positions: [] };
}

export function normalizeCv(data) {
    const addIds = (items = []) =>
        items.map((item) => ({
            ...item,
            id: item.id ?? createId(),
            ...(item.positions && { positions: addIds(item.positions) }),
        }));

    return {
        ...data,
        contact: { ...EMPTY_CONTACT, ...data.contact },
        sections: addIds(data.sections),
    };
}

export function isValidCv(data) {
    return (
        typeof data === "object" &&
        data !== null &&
        Array.isArray(data.sections) &&
        data.sections.every((section) => Array.isArray(section.positions))
    );
}