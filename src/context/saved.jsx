import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

const SavedContext = createContext();

export const SavedProvider = (props) => {
    const [saved, setSaved] = createStore([]);

    return (
        <SavedContext.Provider value={{ saved, setSaved }}>
            {props.children}
        </SavedContext.Provider>
    );
}

export const useSaved = () => useContext(SavedContext);