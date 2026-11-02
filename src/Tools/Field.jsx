function Field({ label, value, onChange, multiline = false, placeholder }) {
    const props = {
        value: value ?? "",
        placeholder,
        onChange: (event) => onChange(event.target.value),
    };

    return (
        <label className="form-input-box">
            <span>{label}</span>
            {multiline ? <textarea rows={3} {...props} /> : <input type="text" {...props} />}
        </label>
    );
}

export default Field;