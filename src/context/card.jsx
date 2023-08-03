import { createSignal, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

const CardContext = createContext();

export const CardProvider = (props) => {
    const [style, setStyle] = createStore({
        trim: 'rgb(0, 0, 0)',
        base: 'rgb(216, 216, 216)',
        fill: 'rgb(150, 150, 150)'
    });
    const [state, setState] = createStore({});
    const [id, setId] = createSignal();
    const [type, setType] = createSignal();

    return (
        <CardContext.Provider value={{
            state, setState,
            style, setStyle,
            id, setId,
            type, setType
        }}>
            {props.children}
        </CardContext.Provider>
    );
}

export const useCard = () => useContext(CardContext);