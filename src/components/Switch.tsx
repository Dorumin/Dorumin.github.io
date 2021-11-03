import { MutableRefObject } from "react";

type SwitchProps = {
    el: MutableRefObject<Element>
};

export default function Switch({ el }: SwitchProps) {
    return (
        <button className="themeToggler" onClick={() => el.current.classList.toggle('dark')}>
            Toggle
        </button>
    );
}