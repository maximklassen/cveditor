//import { useState } from "react";
import "./App.css";

function App() {
    return (
        <>
            <header>
                <div className="logo">CV Creator</div>
            </header>
            <main>
                <div className="tool-panel">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        className="cv-name"
                    />
                    <input
                        type="text"
                        name="title"
                        id="name"
                        placeholder="Titel"
                        className="cv-title"
                    />
                    <div className="photo-box"></div>
                    <hr className="separator" />
                    <h4>Kontaktdaten</h4>
                    <div className="form-input-box">
                        <label htmlFor="phone">Telefonnummer</label>
                        <input type="text" name="phone" id="phone" />
                    </div>
                    <div className="form-input-box">
                        <label htmlFor="email">E-Mail</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="form-input-box">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input type="text" name="linkedin" id="linkedin" />
                    </div>
                    <div className="form-input-box">
                        <label htmlFor="behance">Behance</label>
                        <input type="text" name="behance" id="behance" />
                    </div>
                    <div className="form-input-box">
                        <label htmlFor="github">GitHub</label>
                        <input type="text" name="github" id="github" />
                    </div>
                    <hr className="separator" />
                    <div className="form-input-box">
                        <label htmlFor="profile">Profil</label>
                        <textarea name="profile" id="profile" ></textarea>
                    </div>
                    <hr className="separator" />
                    <h4>Abschnitt hinzufügen</h4>
                    <div className="form-input-box">
                        <select name="section-type" id="section-type">
                            <option value="default">Klassischer Abschnitt</option>
                            <option value="certificates">Zertifikate/Weiterbildungen</option>
                            <option value="skills">Kentnisse</option>
                        </select>
                        <button>Hinzufügen</button>
                        <div className="sections-list">
                            {/* List of <Section /> */}
                        </div>
                    </div>
                </div>
                <div className="preview-panel"></div>
            </main>
            <footer>
                <div className="copy">&copy; Maxim Klassen, 2026</div>
            </footer>
        </>
    );
}

export default App;
