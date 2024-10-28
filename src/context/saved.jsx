import { createContext, useContext, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

const SavedContext = createContext();

export const SavedProvider = (props) => {
    const [cards, setCards] = createStore([]);
    const [selected, setSelected] = createSignal(0);
    const [fullscreen, setFullscreen] = createSignal(false);

    return (
        <SavedContext.Provider value={{ cards, setCards, selected, setSelected, fullscreen, setFullscreen }}>
            {props.children}
        </SavedContext.Provider>
    );
}

export const useSaved = () => useContext(SavedContext);