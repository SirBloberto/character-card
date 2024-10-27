import { createContext, useContext, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

const SavedContext = createContext();

export const SavedProvider = (props) => {
    const [cards, setCards] = createStore([]);
    const [selected, setSelected] = createSignal(0);
    const [fullscreen, setFullscreen] = createSignal(false);
    const [landscape, setLandscape] = createSignal(true);

    onMount(() => {
        setLandscape(window.screen.orientation.type.includes("landscape"));
        window.screen.orientation.onchange = (event) => setLandscape(event.target.type.includes("landscape"));
    });

    return (
        <SavedContext.Provider value={{ cards, setCards, selected, setSelected, fullscreen, setFullscreen, landscape }}>
            {props.children}
        </SavedContext.Provider>
    );
}

export const useSaved = () => useContext(SavedContext);