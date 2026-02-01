import { createContext, useContext, createSignal, onMount } from 'solid-js';
import { MOBILE_VERTICAL } from '../styles/variables';

const AppContext = createContext();

export const AppProvider = (props) => {
    const [fullscreen, setFullscreen] = createSignal(false);
    const [mobile, setMobile] = createSignal();
    const [landscape, setLandscape] = createSignal();
    const [top, setTop] = createSignal(true);

    onMount(() => {
        setLandscape(window.screen.orientation.type.includes("landscape"));
        setMobile(window.screen.width < MOBILE_VERTICAL)
        window.addEventListener('resize', () => {
            setMobile((window.innerWidth < MOBILE_VERTICAL && window.screen.orientation.type.includes("landscape")) || (window.innerHeight < MOBILE_VERTICAL && window.screen.orientation.type.includes("portrait")));
            setLandscape(window.innerWidth > window.innerHeight);
        });
        window.addEventListener("scroll", () => console.log(window.scrollY))
    });

    return (
        <AppContext.Provider value={{ fullscreen, mobile, landscape, setFullscreen, top }}>
            {props.children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);