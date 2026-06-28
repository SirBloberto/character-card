import { styled } from 'solid-styled-components';
import GlobalStyle from './styles/global';
import Editor from './components/editor';
import { CardProvider } from './context/card';
import { SavedProvider, useSaved } from './context/saved';
import SavedCards from './components/saved/cards';
import RightPanel from './components/right-panel';
import { Show, onMount, onCleanup } from 'solid-js';
import rotate from './images/rotate.webp';
import { useApp } from './context/app';
import KofiWidget from './components/kofi_widget';
import { useCard } from './context/card';
import { downloadPNG, printCard } from './utilities/download';

const StyledMain = styled.main`
    display: flex;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

const StyledRotate = styled.div`
    font-size: 2rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

    img {
        width: 100px;
        height: 100px;
    }
`;

const StyledMobileStyleBtn = styled.button`
    position: fixed;
    bottom: 18px;
    right: 18px;
    z-index: 200;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #E8932A;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.5);
    transition: background 0.15s, transform 0.15s;

    &:hover { background: #d4821e; transform: scale(1.05); }
    &:active { transform: scale(0.96); }

    svg { width: 22px; height: 22px; }
`;

const PaletteIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="13.5" cy="6.5" r="1"/>
        <circle cx="17.5" cy="10.5" r="1"/>
        <circle cx="8.5" cy="7.5" r="1"/>
        <circle cx="6.5" cy="12.5" r="1"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125 0-.922.75-1.688 1.672-1.688h1.953c3.117 0 5.602-2.508 5.602-5.625C21.969 6.422 17.461 2 12 2z"/>
    </svg>
);

// Inner layout — lives inside SavedProvider so it can read fullscreen state
const AppInner = () => {
    const { fullscreen, cardRef } = useSaved();
    const { mobile, landscape, openRight, setOpenRight } = useApp();
    const { state, type } = useCard();

    onMount(() => {
        function handleKey(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'e') { e.preventDefault(); downloadPNG(cardRef(), state); }
                if (e.key === 'p') { e.preventDefault(); printCard(cardRef(), state); }
            }
        }
        document.addEventListener('keydown', handleKey);
        onCleanup(() => document.removeEventListener('keydown', handleKey));
    });

    return (
        <>
            <Show when={!fullscreen()}>
                <SavedCards/>
            </Show>
            <Editor/>
            <Show when={(!mobile() || openRight()) && !fullscreen()}>
                <RightPanel onClose={() => setOpenRight(false)}/>
            </Show>
            <Show when={mobile() && !openRight() && !landscape() && !fullscreen()}>
                <StyledMobileStyleBtn onClick={() => setOpenRight(true)} aria-label="Open styles">
                    <PaletteIcon/>
                </StyledMobileStyleBtn>
            </Show>
        </>
    );
};

const App = () => {
    const { landscape, mobile } = useApp();

    return (
        <StyledMain>
            <GlobalStyle/>
            <Show when={landscape() && mobile()}>
                <StyledRotate>
                    <img src={rotate}/>
                    Please rotate your device
                </StyledRotate>
            </Show>
            <Show when={!mobile() || (!landscape() && mobile())}>
                <SavedProvider>
                    <CardProvider>
                        <AppInner/>
                    </CardProvider>
                </SavedProvider>
            </Show>
            <KofiWidget/>
        </StyledMain>
    );
}

export default App;
