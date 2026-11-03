import { useState } from "react";
import { useCvDispatch } from "../state/CvDispatchContext";
import { SECTION_TYPES, createId } from "../state/cvModel";

function SectionAdd() {
    const dispatch = useCvDispatch();
    const [sectionType, setSectionType] = useState("default");

    return (
        <>
            <h4>Abschnitt hinzufügen</h4>
            <div className="form-input-box add-section">
                <select
                    name="section-type"
                    id="section-type"
                    value={sectionType}
                    onChange={(event) => setSectionType(event.target.value)}
                >
                    {Object.entries(SECTION_TYPES).map(([type, { label }]) => (
                        <option key={type} value={type}>
                            {label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() => dispatch({ type: "ADD_SECTION", id: createId(), sectionType })}
                >
                    Hinzufügen
                </button>
            </div>
        </>
    );
}

export default SectionAdd;
