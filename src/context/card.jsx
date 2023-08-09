import { createSignal, createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';

const CardContext = createContext();

export const CardProvider = (props) => {
    const state = createMutable({});
    const style = createMutable({
        trim: 'rgb(0, 0, 0)',
        base: 'rgb(216, 216, 216)',
        fill: 'rgb(150, 150, 150)'
    });
    const [type, setType] = createSignal('basic');

    return (
        <CardContext.Provider value={{ state, style, type, setType }}>
            {props.children}
        </CardContext.Provider>
    );
}

export const useCard = () => useContext(CardContext);