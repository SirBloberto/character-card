import { styled } from 'solid-styled-components';
import Card from './card';
import { useSaved } from '../context/saved';
import { useCard } from '../context/card';
import { Show, createSignal, onCleanup, onMount } from 'solid-js';

const CARD_RATIO = { basic: 1.4, fashion: 1.4, tome: 1.4, wanted: 1.4, arcane: 1.4, nordic: 1.4, elven: 1.4, codex: 1.4, tarot: 1.4 };

const StyledCanvas = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1c1c24;
    background-image: radial-gradient(circle, rgba(255,255,255,0.11) 1px, transparent 1px);
    background-size: 24px 24px;
    position: relative;
    overflow: hidden;
    min-width: 0;
`;

const StyledCardWrap = styled.div`
    width: 94%;
    max-width: 900px;
`;

const StyledCanvasBtn = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(6px);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.75;
    transition: opacity 0.15s, background 0.15s;

    svg { width: 16px; height: 16px; }

    &:hover { opacity: 1; background: rgba(0,0,0,0.6); }
`;

const MaximizeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
        <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
        <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
    </svg>
);

const MinimizeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
        <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
        <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
        <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
    </svg>
);

const Editor = () => {
    const { fullscreen, setFullscreen, setCardRef } = useSaved();
    const { type } = useCard();
    const [showBtn, setShowBtn] = createSignal(true);

    const fsStyle = () => {
        if (!fullscreen()) return {};
        const ratio = CARD_RATIO[type()] || 5 / 3;
        return { '--fs-width': `min(100vw, calc(100vh * ${ratio.toFixed(4)}))` };
    };

    let svg = <Card/>;
    let hideTimer;

    onMount(() => {
        setCardRef(svg);

        const handleActivity = () => {
            setShowBtn(true);
            clearTimeout(hideTimer);
            if (fullscreen()) hideTimer = setTimeout(() => setShowBtn(false), 2000);
        };

        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('mousedown', handleActivity);
        document.addEventListener('touchstart', handleActivity, { passive: true });

        // Handle ESC key or swipe-down exit from browser
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                setFullscreen(false);
                screen.orientation.unlock();
            }
        });

        onCleanup(() => {
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('mousedown', handleActivity);
            document.removeEventListener('touchstart', handleActivity);
        });
    });

    // Called directly from click — preserves the browser's user-gesture requirement
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => {
                    setFullscreen(true);
                    screen.orientation.lock('landscape').catch(() => {});
                })
                .catch(() => {});
        } else {
            document.exitFullscreen()
                .then(() => setFullscreen(false))
                .catch(() => {});
        }
    }

    return (
        <StyledCanvas>
            <StyledCardWrap class={fullscreen() ? 'fullscreen-editor' : undefined} style={fsStyle()}>
                <Card ref={svg}/>
            </StyledCardWrap>
            <Show when={showBtn()}>
                <StyledCanvasBtn
                    onClick={toggleFullscreen}
                    aria-label={fullscreen() ? 'Exit fullscreen' : 'Enter fullscreen'}
                    title={fullscreen() ? 'Exit fullscreen' : 'Fullscreen'}
                >
                    <Show when={fullscreen()} fallback={<MaximizeIcon/>}>
                        <MinimizeIcon/>
                    </Show>
                </StyledCanvasBtn>
            </Show>
        </StyledCanvas>
    );
}

export default Editor;
