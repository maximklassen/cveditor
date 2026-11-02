import { normalizeCv } from "./cvModel";

export function createSection(id, type) {
    return {
        id,
        type,
        title: SECTION_TYPES[type].defaultTitle,
        positions: [],
    };
}

export function cvReducer(state, action) {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };

        case "SET_CONTACT":
            return {
                ...state,
                contact: { ...state.contact, [action.field]: action.value },
            };

        case "ADD_SECTION":
            return {
                ...state,
                sections: [...state.sections, createSection(action.id, action.sectionType)],
            };

        case "UPDATE_SECTION":
            return {
                ...state,
                sections: state.sections.map((section) =>
                    section.id === action.id ? { ...section, ...action.changes } : section,
                ),
            };

        case "REMOVE_SECTION":
            return {
                ...state,
                sections: state.sections.filter((section) => section.id !== action.id),
            };

        case "LOAD":
            return normalizeCv(action.data);

        default:
            return state;
    }
}