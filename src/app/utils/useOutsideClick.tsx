import { MutableRefObject, useEffect } from "react"

export default function useOutsideClick(ref : MutableRefObject<any>, validClick? : Function | null, invalidClick? : Function | null) {
    useEffect(() => {
        function onOutsideClick(e : Event) {
            if (ref.current) {
                if (ref.current.contains(e.target)) {
                    if (validClick != null) validClick();
                } else {
                    if (invalidClick != null) invalidClick();
                }
            }
        }

        document.addEventListener("mousedown", onOutsideClick);

        return () => {
            document.removeEventListener("mousedown", onOutsideClick);
        }
    }, [ref])
}
