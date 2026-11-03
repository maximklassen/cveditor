import { createChapter, createPosition, createSection, normalizeCv } from "./cvModel";

function editInSections(sections, id, edit) {
    return sections.map((section) => ({
        ...section,
        positions: editPositionList(section.positions, id, edit),
    }));
}

function moveItem(list, index, direction) {
    const target = index + direction;
    if (target < 0 || target >= list.length) return list;
    const copy = [...list];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    return copy;
}

function editPositionList(list, id, edit) {
    const index = list.findIndex((position) => position.id === id);
    if (index !== -1) return edit(list, index);
    return list.map((position) =>
        position.positions
            ? { ...position, positions: editPositionList(position.positions, id, edit) }
            : position,
    );
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

        case "MOVE_SECTION": {
            const index = state.sections.findIndex((section) => section.id === action.id);
            return { ...state, sections: moveItem(state.sections, index, action.direction) };
        }

        case "ADD_POSITION": {
            const created = action.chapter
                ? createChapter(action.id)
                : createPosition(action.id, action.positionType);

            if (!action.parentId) {
                return {
                    ...state,
                    sections: state.sections.map((section) =>
                        section.id === action.sectionId
                            ? { ...section, positions: [...section.positions, created] }
                            : section,
                    ),
                };
            }
            return {
                ...state,
                sections: editInSections(state.sections, action.parentId, (list, index) =>
                    list.map((position, i) =>
                        i === index
                            ? { ...position, positions: [...position.positions, created] }
                            : position,
                    ),
                ),
            };
        }

        case "UPDATE_POSITION":
            return {
                ...state,
                sections: editInSections(state.sections, action.id, (list, index) =>
                    list.map((position, i) =>
                        i === index ? { ...position, ...action.changes } : position,
                    ),
                ),
            };

        case "REMOVE_POSITION":
            return {
                ...state,
                sections: editInSections(state.sections, action.id, (list, index) =>
                    list.filter((_, i) => i !== index),
                ),
            };

        case "MOVE_POSITION":
            return {
                ...state,
                sections: editInSections(state.sections, action.id, (list, index) =>
                    moveItem(list, index, action.direction),
                ),
            };

        case "LOAD":
            return normalizeCv(action.data);

        default:
            return state;
    }
}
