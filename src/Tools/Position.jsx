function Position() {
    return (
        <div className="position">
            <input type="text" placeholder="Titel der Postion" />
            {type !== "skills" && (
                <div className="form-input-box">
                    <label>Zeitraum</label>
                    <input type="date" /> - <input type="date" />
                </div>
            )}
            {type === "certificates" && (
                <input type="text" placeholder="Anschtalt" />
            )}
            {type === "default" ||
                (chapter && (
                    <>
                        <input
                            type="text"
                            placeholder="Unternehemen/Anschtalt"
                        />
                        <input type="text" placeholder="Ort" />
                        <textarea>Beschreibung</textarea>
                    </>
                ))}
            {chapter && (
                <>
                    <div className="positions-list">
                        {/* List of <Position /> */}
                    </div>
                    <button>Zeile (Position) hinzufügen</button>
                </>
            )}
        </div>
    );
}

export default Position;
