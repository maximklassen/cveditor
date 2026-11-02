import { createId } from "../state/cvModel";
import Field from "./Field";

function PeriodFields({ position, onChange }) {
    const isCurrent = position.end === null;

    return (
        <div className="period-fields">
            <label className="form-input-box">
                <span>Von</span>
                <input
                    type="month"
                    value={position.start?.slice(0, 7) ?? ""}
                    onChange={(event) => onChange({ start: event.target.value })}
                />
            </label>
            <label className="form-input-box">
                <span>Bis</span>
                <input
                    type="month"
                    value={position.end?.slice(0, 7) ?? ""}
                    disabled={isCurrent}
                    onChange={(event) => onChange({ end: event.target.value })}
                />
            </label>
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={isCurrent}
                    onChange={(event) => onChange({ end: event.target.checked ? null : "" })}
                />
                zurzeit
            </label>
        </div>
    );
}

function Position({ position, sectionId, sectionType, dispatch, isFirst, isLast }) {
    const update = (changes) => dispatch({ type: "UPDATE_POSITION", id: position.id, changes });

    function addChild() {
        dispatch({
            type: "ADD_POSITION",
            sectionId,
            parentId: position.id,
            id: createId(),
            positionType: "default",
        });
    }

    if (position.chapter) {
        return (
            <div className="position chapter">
                <div className="item-header">
                    <strong>Unterabschnitt</strong>
                </div>
                <Field
                    label="Titel des Unterabschnitts"
                    value={position.title}
                    onChange={(title) => update({ title })}
                />
                <div className="positions-list">
                    {position.positions.map((child, index) => (
                        <Position
                            key={child.id}
                            position={child}
                            sectionId={sectionId}
                            sectionType="default"
                            dispatch={dispatch}
                            isFirst={index === 0}
                            isLast={index === position.positions.length - 1}
                        />
                    ))}
                </div>
                <button type="button" onClick={addChild}>
                    Zeile (Position) hinzufügen
                </button>
            </div>
        );
    }

    return (
        <div className="position">
            <div className="item-header">
                <strong>{position.title || "Neue Position"}</strong>
            </div>
            <Field
                label={sectionType === "skills" ? "Kategorie" : "Titel der Position"}
                value={position.title}
                onChange={(title) => update({ title })}
            />
            {sectionType === "certificates" && (
                <Field
                    label="Institution"
                    value={position.organisation}
                    onChange={(organisation) => update({ organisation })}
                />
            )}
            {sectionType === "default" && (
                <>
                    <Field
                        label="Unternehmen/Institution"
                        value={position.firm}
                        onChange={(firm) => update({ firm })}
                    />
                    <Field
                        label="Ort"
                        value={position.location}
                        onChange={(location) => update({ location })}
                    />
                </>
            )}
            {sectionType !== "skills" && <PeriodFields position={position} onChange={update} />}
            {sectionType !== "certificates" && (
                <Field
                    label={sectionType === "skills" ? "Kenntnisse" : "Beschreibung"}
                    value={position.description}
                    onChange={(description) => update({ description })}
                    multiline
                    placeholder={
                        sectionType === "default"
                            ? "Zeilen, die mit „- “ beginnen, werden zu einer Liste"
                            : undefined
                    }
                />
            )}
        </div>
    );
}

export default Position;
