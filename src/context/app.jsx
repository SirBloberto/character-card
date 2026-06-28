import { createContext, useContext, createSignal, onMount } from 'solid-js';
import { MOBILE_VERTICAL } from '../styles/variables';

const AppContext = createContext();

export const AppProvider = (props) => {
    const [mobile, setMobile] = createSignal();
    const [landscape, setLandscape] = createSignal();
    const [openRight, setOpenRight] = createSignal(false);

    onMount(() => {
        setLandscape(window.screen.orientation.type.includes("landscape"));
        setMobile(window.screen.width < MOBILE_VERTICAL);
        window.addEventListener('resize', () => {
            setMobile((window.innerWidth < MOBILE_VERTICAL && window.screen.orientation.type.includes("landscape")) || (window.innerHeight < MOBILE_VERTICAL && window.screen.orientation.type.includes("portrait")));
            setLandscape(window.innerWidth > window.innerHeight);
        });
    });

    return (
        <AppContext.Provider value={{ mobile, landscape, openRight, setOpenRight }}>
            {props.children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);