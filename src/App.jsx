import { useEffect, useReducer } from "react";
import "./App.css";
import demoData from "./data/data.json";
import { CvDispatchContext } from "./state/CvDispatchContext";
import { normalizeCv } from "./state/cvModel";
import { cvReducer } from "./state/cvReducer";
import Preview from "./Templates/Default/Preview";
import Panel from "./Tools/Panel";
import Toolbar from "./Tools/Toolbar";
import { loadCv, saveCv } from "./utils/storage";

// Startzustand: zuletzt gespeicherter Lebenslauf, sonst die Beispieldaten.
function initCv() {
    return loadCv() ?? normalizeCv(demoData);
}

function App() {
    // Der gesamte Lebenslauf liegt als JavaScript-Objekt in einem einzigen State.
    // Panel (Formular) und Preview (Vorschau) bekommen ihn als Props,
    // dispatch steht allen Komponenten über den Context zur Verfügung.
    const [cv, dispatch] = useReducer(cvReducer, null, initCv);

    // Jede Änderung wird automatisch im Browser gespeichert.
    useEffect(() => {
        saveCv(cv);
    }, [cv]);

    return (
        <CvDispatchContext value={dispatch}>
            <header className="app-header">
                <div className="logo">
                    <img src="/favicon.svg" alt="" />
                    <span>CV Editor</span>
                </div>
                <Toolbar cv={cv} />
            </header>
            <main>
                <Panel cv={cv} />
                <Preview cv={cv} />
            </main>
            <footer className="app-footer">
                <div className="copy">&copy; Maxim Klassen, 2026</div>
            </footer>
        </CvDispatchContext>
    );
}

export default App;
