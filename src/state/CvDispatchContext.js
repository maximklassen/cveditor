import { createContext, useContext } from "react";

export const CvDispatchContext = createContext(null);

export function useCvDispatch() {
    const dispatch = useContext(CvDispatchContext);
    if (!dispatch) {
        throw new Error("useCvDispatch muss innerhalb von <CvDispatchContext> verwendet werden.");
    }
    return dispatch;
}
