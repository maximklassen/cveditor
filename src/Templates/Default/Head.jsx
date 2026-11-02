function Head() {
    return (
        <div className="header">
            <div className="header-title">
                <h1>{/* Name */}</h1>
                <strong className="subtitle">
                    {/* Titel */}
                </strong>
                <ul className="contacts">
                    <li>
                        <strong>Mobil:</strong> {/* Phone */}
                    </li>
                    <li>
                        <strong>E-Mail:</strong> {/* Email */}
                    </li>
                    <li>
                        <strong>LinkedIn:</strong> {/* Linkedin link */}
                    </li>
                    <li>
                        <strong>GitHub:</strong> {/* GitHub links */}
                    </li>
                </ul>
            </div>
            <div className="header-photo">
                <img
                    className="photo"
                    src="/* Photo */"
                    alt=""
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}

export default Head;
