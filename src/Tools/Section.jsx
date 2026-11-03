import { useCvDispatch } from "../state/CvDispatchContext";
import { SECTION_TYPES, createId } from "../state/cvModel";
import Field from "./Field";
import ItemControls from "./ItemControls";
import Position from "./Position";

function Section({ section, isFirst, isLast }) {
    const dispatch = useCvDispatch();

    function addPosition(chapter) {
        dispatch({
            type: "ADD_POSITION",
            sectionId: section.id,
            id: createId(),
            positionType: section.type,
            chapter,
        });
    }

    function remove() {
        const hasContent = section.positions.length > 0;
        if (hasContent && !window.confirm(`Abschnitt „${section.title}“ löschen?`)) return;
        dispatch({ type: "REMOVE_SECTION", id: section.id });
    }

    return (
        <div className="section">
            <div className="item-header">
                <span className="badge">{SECTION_TYPES[section.type].label}</span>
                <ItemControls
                    isFirst={isFirst}
                    isLast={isLast}
                    onMove={(direction) =>
                        dispatch({ type: "MOVE_SECTION", id: section.id, direction })
                    }
                    onRemove={remove}
                />
            </div>
            <Field
                label="Titel des Abschnitts"
                value={section.title}
                onChange={(title) =>
                    dispatch({ type: "UPDATE_SECTION", id: section.id, changes: { title } })
                }
            />
            <div className="positions-list">
                {section.positions.map((position, index) => (
                    <Position
                        key={position.id}
                        position={position}
                        sectionId={section.id}
                        sectionType={section.type}
                        isFirst={index === 0}
                        isLast={index === section.positions.length - 1}
                    />
                ))}
            </div>
            <div className="button-row">
                <button type="button" onClick={() => addPosition(false)}>
                    Zeile (Position) hinzufügen
                </button>
                {section.type === "default" && (
                    <button type="button" onClick={() => addPosition(true)}>
                        Unterabschnitt hinzufügen
                    </button>
                )}
            </div>
        </div>
    );
}

export default Section;
