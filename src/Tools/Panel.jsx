import Section from "./Section";
import SectionAdd from "./SectionAdd";
import StaticData from "./StaticData";

function Panel({ cv, dispatch }) {
    return (
        <div className="tool-panel">
            <StaticData cv={cv} dispatch={dispatch} />
            <hr className="separator" />
            <SectionAdd dispatch={dispatch} />
            <div className="sections-list">
                {cv.sections.map((section, index) => (
                    <Section
                        key={section.id}
                        section={section}
                        dispatch={dispatch}
                    />
                ))}
            </div>
        </div>
    );
}

export default Panel;
