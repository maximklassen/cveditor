import { useLayoutEffect, useRef, useState } from "react";
import "./ScaledPage.css";

// Zeigt den Inhalt auf einem Blatt in fester Breite (210 mm, siehe ScaledPage.css)
// und skaliert dieses Blatt so, dass es genau in die verfügbare Breite passt.
// Das Layout im Blatt bleibt dabei unverändert: es wird nur vergrößert oder verkleinert.
function ScaledPage({ children }) {
    const wrapperRef = useRef(null);
    const sheetRef = useRef(null);
    const [fit, setFit] = useState({ scale: 1, height: undefined });

    // useLayoutEffect statt useEffect: Wir messen das DOM, bevor der Browser zeichnet.
    // So blitzt nie kurz die falsche Größe auf.
    useLayoutEffect(() => {
        const wrapper = wrapperRef.current;
        const sheet = sheetRef.current;

        function updateScale() {
            // offsetWidth/offsetHeight ignorieren transform, liefern also die echte Blattgröße.
            const scale = wrapper.clientWidth / sheet.offsetWidth;
            setFit({ scale, height: sheet.offsetHeight * scale });
        }

        updateScale();
        // Neu berechnen, wenn sich die Breite des Bereichs oder die Höhe des Inhalts ändert.
        const observer = new ResizeObserver(updateScale);
        observer.observe(wrapper);
        observer.observe(sheet);
        return () => observer.disconnect();
    }, []);

    return (
        // transform ändert die Layout-Höhe nicht, deshalb setzen wir die Höhe des
        // Wrappers selbst auf (Blatthöhe * Skalierung). Sonst wäre die Scrollhöhe falsch.
        <div ref={wrapperRef} className="scaled-page" style={{ height: fit.height }}>
            <div
                ref={sheetRef}
                className="scaled-page-sheet"
                style={{ transform: `scale(${fit.scale})` }}
            >
                {children}
            </div>
        </div>
    );
}

export default ScaledPage;
