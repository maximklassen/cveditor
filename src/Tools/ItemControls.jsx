function ItemControls({ isFirst, isLast, onMove, onRemove }) {
    return (
        <div className="item-controls">
            <button
                type="button"
                onClick={() => onMove(-1)}
                disabled={isFirst}
                title="Nach oben"
                aria-label="Nach oben"
            >
                ↑
            </button>
            <button
                type="button"
                onClick={() => onMove(1)}
                disabled={isLast}
                title="Nach unten"
                aria-label="Nach unten"
            >
                ↓
            </button>
            <button
                type="button"
                className="danger"
                onClick={onRemove}
                title="Löschen"
                aria-label="Löschen"
            >
                ✕
            </button>
        </div>
    );
}

export default ItemControls;
