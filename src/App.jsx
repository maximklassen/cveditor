//import { useState } from "react";
import "./App.css";
import Preview from "./Templates/Default/Preview";
import Panel from "./Tools/Panel";

function App() {
    return (
        <>
            <header>
                <div className="logo">CV Creator</div>
            </header>
            <main>
                <Panel />
                <Preview />
            </main>
            <footer>
                <div className="copy">&copy; Maxim Klassen, 2026</div>
            </footer>
        </>
    );
}

export default App;
