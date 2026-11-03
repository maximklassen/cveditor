import { useEffect, useReducer } from "react";
import "./App.css";
import demoData from "./data/data.json";
import { CvDispatchContext } from "./state/CvDispatchContext";
import { normalizeCv } from "./state/cvModel";
import { cvReducer } from "./state/cvReducer";
import Preview from "./Templates/Default/Preview";
import Panel from "./Tools/Panel";
import { loadCv, saveCv } from "./utils/storage";

// Startzustand
function initCv() {
    return loadCv() ?? normalizeCv(demoData);
}

function App() {
    const [cv, dispatch] = useReducer(cvReducer, null, initCv);

    useEffect(() => {
        saveCv(cv);
    }, [cv]);

    return (
        <CvDispatchContext value={dispatch}>
            <header className="app-header">
                <div className="logo">CV Editor</div>
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
