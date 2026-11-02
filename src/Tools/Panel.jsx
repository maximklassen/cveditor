import SectionAdd from "./SectionAdd";
import StaticData from "./StaticData";

function Panel() {
    return (
        <div className="tool-panel">
            <StaticData />
            <hr className="separator" />
            <SectionAdd />
            <div className="sections-list">{/* List of <Section /> */}</div>
        </div>
    );
}

export default Panel;
