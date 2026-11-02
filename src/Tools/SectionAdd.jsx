function SectionAdd() {
    return (
        <>
            <h4>Abschnitt hinzufügen</h4>
            <div className="form-input-box">
                <select name="section-type" id="section-type">
                    <option value="default">Klassischer Abschnitt</option>
                    <option value="certificates">
                        Zertifikate/Weiterbildungen
                    </option>
                    <option value="skills">Kentnisse</option>
                </select>
                <button>Hinzufügen</button>
            </div>
        </>
    );
}

export default SectionAdd;
