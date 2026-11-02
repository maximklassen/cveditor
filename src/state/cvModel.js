export const EMPTY_CONTACT = {
    address: "",
    phone: "",
    email: "",
    linkedin: "",
    behance: "",
    github: [],
};

export function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
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