import { createSignal, createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { TEMPLATES } from '../utilities/templates';

const CardContext = createContext();

export const CardProvider = (props) => {
    const state = createMutable({});
    const dark = TEMPLATES[0];
    const style = createMutable({
        trim: dark.trim,
        fill: dark.fill,
        base: dark.base,
        text: dark.text,
    });
    const [type, setType] = createSignal('basic');

    return (
        <CardContext.Provider value={{ state, style, type, setType }}>
            {props.children}
        </CardContext.Provider>
    );
}

export const useCard = () => useContext(CardContext);