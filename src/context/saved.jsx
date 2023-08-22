import { createContext, useContext, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

const SavedContext = createContext();

export const SavedProvider = (props) => {
    const [cards, setCards] = createStore([]);
    const [selected, setSelected] = createSignal(0);

    return (
        <SavedContext.Provider value={{ cards, setCards, selected, setSelected }}>
            {props.children}
        </SavedContext.Provider>
    );
}

export const useSaved = () => useContext(SavedContext);