import { useEffect } from "react";

type KeyBinding = {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
};

function useKey(
    bindings: string[] | string,
    callback: (event: KeyboardEvent) => void
) {
    useEffect(() => {
        const parseBinding = (binding: string): KeyBinding => {
            const parts = binding.split("+");
            const key = parts.pop() as string;
            return {
                key,
                ctrl: parts.includes("Ctrl"),
                shift: parts.includes("Shift"),
                alt: parts.includes("Alt"),
                meta: parts.includes("Meta"),
            };
        };

        const parsedBindings =
            typeof bindings === "string"
                ? [parseBinding(bindings)]
                : bindings.map(parseBinding);

        const handleKeyPress = (event: KeyboardEvent) => {
            parsedBindings.forEach(({ key, ctrl, shift, alt, meta }) => {
                if (
                    event.key === key &&
                    (ctrl === undefined || event.ctrlKey === ctrl) &&
                    (shift === undefined || event.shiftKey === shift) &&
                    (alt === undefined || event.altKey === alt) &&
                    (meta === undefined || event.metaKey === meta)
                ) {
                    callback(event);
                }
            });
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [bindings, callback]);
}

export default useKey;
