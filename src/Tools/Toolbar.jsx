import { useRef } from "react";
import demoData from "../data/data.json";
import { useCvDispatch } from "../state/CvDispatchContext";
import { isValidCv } from "../state/cvModel";
import { downloadJson, readJsonFile } from "../utils/files";

function Toolbar({ cv }) {
    const dispatch = useCvDispatch();
    const fileInput = useRef(null);

    async function handleImport(event) {
        const file = event.target.files[0];
        event.target.value = ""; // dieselbe Datei kann danach erneut gewählt werden
        if (!file) return;

        try {
            const data = await readJsonFile(file);
            if (!isValidCv(data)) throw new Error("Ungültige Struktur");
            if (!window.confirm("Die aktuellen Daten werden durch die Datei ersetzt. Fortfahren?")) {
                return;
            }
            dispatch({ type: "LOAD", data });
        } catch {
            alert("Die Datei ist keine gültige Lebenslauf-JSON-Datei.");
        }
    }

    function handleReset() {
        if (window.confirm("Alle Änderungen verwerfen und die Beispieldaten laden?")) {
            dispatch({ type: "LOAD", data: demoData });
        }
    }

    return (
        <div className="toolbar">
            <button type="button" onClick={() => fileInput.current.click()}>
                JSON importieren
            </button>
            <input
                ref={fileInput}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={handleImport}
            />
            <button type="button" onClick={() => downloadJson(cv, "lebenslauf.json")}>
                JSON exportieren
            </button>
            <button type="button" onClick={() => window.print()}>
                Drucken / PDF
            </button>
            <button type="button" className="danger" onClick={handleReset}>
                Zurücksetzen
            </button>
        </div>
    );
}

export default Toolbar;
