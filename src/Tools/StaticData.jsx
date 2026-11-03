import { useCvDispatch } from "../state/CvDispatchContext";
import { imageToDataUrl } from "../utils/files";
import Field from "./Field";

const CONTACT_FIELDS = [
    ["address", "Wohnort"],
    ["phone", "Telefonnummer"],
    ["email", "E-Mail"],
    ["linkedin", "LinkedIn"],
    ["behance", "Behance"],
];

function StaticData({ cv }) {
    const dispatch = useCvDispatch();
    const setField = (field, value) => dispatch({ type: "SET_FIELD", field, value });
    const setContact = (field, value) => dispatch({ type: "SET_CONTACT", field, value });
    const github = cv.contact.github ?? [];

    async function handlePhoto(event) {
        const file = event.target.files[0];
        event.target.value = "";
        if (!file) return;
        try {
            setField("photo", await imageToDataUrl(file));
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="cv-name"
                value={cv.name ?? ""}
                onChange={(event) => setField("name", event.target.value)}
            />
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Titel"
                className="cv-title"
                value={cv.title ?? ""}
                onChange={(event) => setField("title", event.target.value)}
            />
            <div className="photo-box">
                {cv.photo ? <img src={cv.photo} alt="Foto" /> : <span>Kein Foto</span>}
            </div>
            <div className="button-row">
                <label className="button">
                    Foto wählen
                    <input type="file" accept="image/*" hidden onChange={handlePhoto} />
                </label>
                {cv.photo && (
                    <button type="button" onClick={() => setField("photo", null)}>
                        Foto entfernen
                    </button>
                )}
            </div>
            <hr className="separator" />
            <h4>Kontaktdaten</h4>
            {CONTACT_FIELDS.map(([field, label]) => (
                <Field
                    key={field}
                    label={label}
                    value={cv.contact[field]}
                    onChange={(value) => setContact(field, value)}
                />
            ))}
            <label className="form-input-box">
                <span>GitHub (ein Link pro Zeile)</span>
                <textarea
                    rows={2}
                    value={github.join("\n")}
                    onChange={(event) => setContact("github", event.target.value.split("\n"))}
                    onBlur={() => setContact("github", github.filter((link) => link.trim()))}
                />
            </label>
            <hr className="separator" />
            <Field
                label="Profil (leer lassen, um den Abschnitt auszublenden)"
                value={cv.profile}
                onChange={(value) => setField("profile", value)}
                multiline
            />
        </>
    );
}

export default StaticData;