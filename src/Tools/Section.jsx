function Section() {
    return (
        <div className="section">
            <input type="text" placeholder="Titel des Abschnitts" />
            <div className="positions-list">
                {/* List of <Position /> */}
            </div>
            <button>Zeile (Position) hinzufügen</button>
            <button>Unterabschnitt hinzufügen</button>
            <button>Abschnitt löschen</button>
        </div>
    );
}

export default Section;
