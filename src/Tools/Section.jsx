import Field from "./Field";
import Position from "./Position";

function Section({ section, dispatch }) {
    return (
        <div className="section">
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
                        dispatch={dispatch}
                    />
                ))}
            </div>
            <button>Zeile (Position) hinzufügen</button>
            <button>Unterabschnitt hinzufügen</button>
            <button>Abschnitt löschen</button>
        </div>
    );
}

export default Section;
