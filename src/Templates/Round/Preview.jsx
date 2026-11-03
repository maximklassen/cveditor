import { formatMonth, parseDescription, shortenUrl } from "../../utils/format";
import "./preview.css";

function Period({ start, end }) {
    if (!start) return null;
    return (
        <div className="position-date">
            <time dateTime={start.slice(0, 7)}>{formatMonth(start)}</time>
            {end === null && (
                <>
                    {" - "}
                    <span>zurzeit</span>
                </>
            )}
            {end && (
                <>
                    {" - "}
                    <time dateTime={end.slice(0, 7)}>{formatMonth(end)}</time>
                </>
            )}
        </div>
    );
}

function Description({ text }) {
    return parseDescription(text).map((block, index) =>
        block.type === "ul" ? (
            <ul key={index}>
                {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        ) : (
            <p key={index}>{block.text}</p>
        ),
    );
}

function PositionRow({ position, nested = false }) {
    const Heading = nested ? "h4" : "h3";
    return (
        <article className={nested ? "position-chapter" : "position position-table"}>
            <div className="position-head">
                <Period start={position.start} end={position.end} />
                {position.firm && <strong className="position-company">{position.firm}</strong>}
                {position.location && <div className="position-location">{position.location}</div>}
            </div>
            <div className="position-content">
                <Heading>{position.title}</Heading>
                <Description text={position.description} />
            </div>
        </article>
    );
}

function Chapter({ chapter }) {
    return (
        <article className="position">
            <h3 className="subtitle">{chapter.title}</h3>
            {chapter.positions.map((position) => (
                <PositionRow key={position.id} position={position} nested />
            ))}
        </article>
    );
}

function CertificateRow({ position }) {
    return (
        <article className="position position-table">
            <div className="position-head">
                <Period start={position.start} end={position.end} />
            </div>
            <div className="position-content">
                <h3>{position.title}</h3>
                {position.organisation && (
                    <>
                        {" - "}
                        <strong className="position-company">{position.organisation}</strong>
                    </>
                )}
            </div>
        </article>
    );
}

function SkillsBox({ positions }) {
    return (
        <div className="skills-box">
            {positions.map((position) => (
                <p key={position.id} className="position position-table">
                    <strong className="position-head">{position.title}</strong>
                    <span className="position-content">{position.description}</span>
                </p>
            ))}
        </div>
    );
}

function CvSection({ section }) {
    const className =
        section.type === "certificates" ? "logic-section crt-section" : "logic-section";

    return (
        <section className={className}>
            <h2>{section.title}</h2>
            {section.type === "skills" && <SkillsBox positions={section.positions} />}
            {section.type === "certificates" &&
                section.positions.map((position) => (
                    <CertificateRow key={position.id} position={position} />
                ))}
            {section.type === "default" &&
                section.positions.map((position) =>
                    position.chapter ? (
                        <Chapter key={position.id} chapter={position} />
                    ) : (
                        <PositionRow key={position.id} position={position} />
                    ),
                )}
        </section>
    );
}

function Preview({ cv }) {
    const { contact } = cv;
    const links = [contact.linkedin, contact.behance, ...(contact.github ?? [])]
        .filter(Boolean)
        .map(shortenUrl);
    const mail = [contact.email, contact.phone].filter(Boolean);

    return (
        <div className="preview-panel">
            <div className="cv">
                <div className="cv-header">
                    <div className="header-title">
                        <h1>{cv.name}</h1>
                        <strong className="subtitle">{cv.title}</strong>
                        <ul className="contacts">
                            {contact.address && (
                                <li>
                                    <strong>Wohnort:</strong> {contact.address}
                                </li>
                            )}
                            {contact.phone && (
                                <li>
                                    <strong>Telefonnummer:</strong> {contact.phone}
                                </li>
                            )}
                            {contact.email && (
                                <li>
                                    <strong>E-Mail:</strong> {contact.mail}
                                </li>
                            )}
                            {links.length > 0 && (
                                <li>
                                    <strong>Links:</strong> {links.join(" | ")}
                                </li>
                            )}
                        </ul>
                    </div>
                    {cv.photo && (
                        <div className="header-photo">
                            <img className="photo" src={cv.photo} alt="" aria-hidden="true" />
                        </div>
                    )}
                </div>
                <div className="cv-main">
                    {cv.profile?.trim() && (
                        <section className="logic-section">
                            <h2>Profil</h2>
                            <p className="color-box">{cv.profile}</p>
                        </section>
                    )}
                    {cv.sections.map((section) => (
                        <CvSection key={section.id} section={section} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Preview;
