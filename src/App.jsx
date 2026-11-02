//import { useState } from "react";
import { useReducer } from "react";
import "./App.css";
import Preview from "./Templates/Default/Preview";
import Panel from "./Tools/Panel";
import cvData from "./data/data.json";
import { normalizeCv } from "./state/cvModel";
import { cvReducer } from "./state/cvReducer";

// Startzustand
function initCv() {
    return normalizeCv(cvData);
}

function App() {
    const [cv, dispatch] = useReducer(cvReducer, null, initCv);

    return (
        <>
            <header className="app-header">
                <div className="logo">CV Editor</div>
            </header>
            <main>
                <Panel cv={cv} dispatch={dispatch} />
                <Preview cv={cv} />
            </main>
            <footer>
                <div className="copy">&copy; Maxim Klassen, 2026</div>
            </footer>
        </>
    );
}

export default App;
