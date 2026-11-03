import Section from "./Section";
import SectionAdd from "./SectionAdd";
import StaticData from "./StaticData";

function Panel({ cv }) {
    return (
        <div className="tool-panel">
            <StaticData cv={cv} />
            <hr className="separator" />
            <SectionAdd />
            <div className="sections-list">
                {cv.sections.map((section, index) => (
                    <Section
                        key={section.id}
                        section={section}
                        isFirst={index === 0}
                        isLast={index === cv.sections.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}

export default Panel;