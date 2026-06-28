import { createSignal, createEffect, onCleanup, For, Show, onMount, batch, children } from 'solid-js';
import { createStore } from 'solid-js/store';
import { styled } from 'solid-styled-components';
import { useCard } from '../context/card';
import { useSaved } from '../context/saved';
import { useApp } from '../context/app';
import { TEMPLATES } from '../utilities/templates';
import { CARDS } from '../utilities/load';
import { downloadPNG, printCard } from '../utilities/download';
import Share from './share';

/* ─── Panel shell ────────────────────────────────────────────── */

const PANEL_BG = '#2a2a34';
const BORDER = 'rgba(255,255,255,0.08)';

const StyledOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 299;
`;

const StyledPanel = styled.div`
    width: 240px;
    min-width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${PANEL_BG};
    border-left: 1px solid ${BORDER};
    overflow: hidden;
    flex-shrink: 0;

    @media (max-width: 719px) {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: min(300px, 90vw);
        min-width: unset;
        z-index: 300;
        border-left: 1px solid ${BORDER};
        box-shadow: -8px 0 32px rgba(0,0,0,0.6);
    }
`;

const StyledMobileHeader = styled.div`
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.9rem 0.85rem;
    border-bottom: 1px solid ${BORDER};

    @media (max-width: 719px) {
        display: flex;
    }
`;

const StyledMobileTitle = styled.span`
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #E8932A;
    letter-spacing: 0.04em;
`;

const StyledMobileClose = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15);
    background: transparent;
    color: rgba(255,255,255,0.6);
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.12s, color 0.12s;
    &:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
`;

const StyledScroll = styled.div`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
`;

/* ─── Collapsible section ────────────────────────────────────── */

const StyledSectionWrap = styled.div`
    border-bottom: 1px solid rgba(255,255,255,0.10);
    &:first-child { border-top: 1px solid rgba(255,255,255,0.10); }
`;

const StyledSectionHeader = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.1rem;
    background: rgba(0,0,0,0.22);
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.1s;

    &:hover { background: rgba(0,0,0,0.32); }
`;

const StyledSectionLabel = styled.span`
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.92);
    font-family: 'Cinzel', serif;
    display: flex;
    align-items: center;
    gap: 0.45rem;

    &::before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 0.75em;
        background: #E8932A;
        border-radius: 2px;
        flex-shrink: 0;
    }
`;

const StyledChevron = styled.span`
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
    transform: ${props => props.open ? 'rotate(0deg)' : 'rotate(-90deg)'};
    transition: transform 0.18s ease;
    display: inline-block;
    line-height: 1;
`;

const StyledSectionBody = styled.div`
    padding: 0.75rem 1.1rem 1.1rem;
`;

const Section = (props) => {
    const [open, setOpen] = createSignal(props.open !== false);
    const c = children(() => props.children);
    return (
        <StyledSectionWrap>
            <StyledSectionHeader onClick={() => setOpen(v => !v)}>
                <StyledSectionLabel>{props.label}</StyledSectionLabel>
                <StyledChevron open={open()}>▾</StyledChevron>
            </StyledSectionHeader>
            <Show when={open()}>
                <StyledSectionBody>{c()}</StyledSectionBody>
            </Show>
        </StyledSectionWrap>
    );
};

/* ─── Colour pickers ─────────────────────────────────────────── */

const StyledColorRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.22rem 0.3rem;
    border-radius: 5px;
    margin-bottom: 0.2rem;
    cursor: pointer;
    transition: background 0.1s;
    background: ${props => props.active ? 'rgba(232,147,42,0.07)' : 'transparent'};
    &:last-child { margin-bottom: 0; }
    &:hover { background: ${props => props.active ? 'rgba(232,147,42,0.1)' : 'rgba(255,255,255,0.04)'}; }
`;

const StyledColorLabel = styled.span`
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
`;

const StyledSwatch = styled.button`
    width: 40px;
    height: 22px;
    border-radius: 5px;
    border: 1.5px solid ${props => props.active ? '#E8932A' : 'rgba(255,255,255,0.18)'};
    background: ${props => props.colour};
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.12s, filter 0.12s;
    box-shadow: ${props => props.active ? '0 0 0 2px rgba(232,147,42,0.3)' : 'none'};
    &:hover { filter: brightness(1.15); }
`;

const StyledPalette = styled.div`
    position: fixed;
    background: #242430;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.7);
    z-index: 600;
    width: 152px;
    overflow: hidden;
`;

const StyledPaletteHeader = styled.div`
    padding: 6px 8px 5px;
    font-size: 0.6rem;
    font-weight: 700;
    font-family: 'Cinzel', serif;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #E8932A;
    border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const StyledPaletteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 3px;
    padding: 6px;
`;

const StyledPaletteColor = styled.button`
    aspect-ratio: 1;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.15);
    background: ${props => props.colour};
    cursor: pointer;
    transition: transform 0.08s;
    &:hover { transform: scale(1.15); }
`;

const COLOURS = [
    '#000000','#333333','#666666','#999999','#cccccc','#FFFFFF',
    '#9F0500','#D33115','#F44E3B','#FE9200','#E27300','#C45100',
    '#808900','#B0BC00','#DBDF00','#FCDC00','#FCC400','#FB9E00',
    '#194D33','#68BC00','#A4DD00','#0C797D','#16A5A5','#68CCCA',
    '#0062B1','#009CE0','#73D8FF','#653294','#7B64FF','#AEA1FF',
    '#AB149E','#FA28FF','#FDA1FF','#4D4D4D','#808080','#B3B3B3',
];

const StyledHexInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 5px;
    padding: 4px 7px;
    color: rgba(255,255,255,0.75);
    font-size: 0.68rem;
    font-family: monospace;
    outline: none;
    transition: border-color 0.12s;
    margin: 0 6px 6px;
    width: calc(100% - 12px);

    &:focus { border-color: rgba(255,255,255,0.28); }
    &::placeholder { color: rgba(255,255,255,0.25); }
`;

const ColorPicker = ({ label, name }) => {
    const { style } = useCard();
    const [open, setOpen] = createSignal(false);
    const [pos, setPos] = createSignal({ top: 0, right: 0 });
    let rowRef;

    // Close on outside mousedown — fires before click so the click propagates
    // through to whichever other swatch the user is switching to.
    createEffect(() => {
        if (!open()) return;
        function handleOutside(e) {
            if (!rowRef?.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleOutside);
        onCleanup(() => document.removeEventListener('mousedown', handleOutside));
    });

    function handleClick() {
        if (!open()) {
            const rect = rowRef.getBoundingClientRect();
            const paletteH = 220;
            setPos({
                top: Math.max(8, rect.top + rect.height / 2 - paletteH / 2),
                right: window.innerWidth - rect.left + 10,
            });
        }
        setOpen(v => !v);
    }

    function applyHex(raw) {
        const val = raw.trim();
        if (/^#[0-9a-f]{6}$/i.test(val) || /^#[0-9a-f]{3}$/i.test(val)) {
            style[name] = val;
            setOpen(false);
        }
    }

    return (
        <StyledColorRow active={open()} ref={rowRef} onClick={handleClick}>
            <StyledColorLabel>{label}</StyledColorLabel>
            <StyledSwatch colour={style[name]} active={open()} aria-label={label}/>
            <Show when={open()}>
                <StyledPalette style={{ top: `${pos().top}px`, right: `${pos().right}px` }} onClick={e => e.stopPropagation()}>
                    <StyledPaletteHeader>{label}</StyledPaletteHeader>
                    <StyledPaletteGrid>
                        <For each={COLOURS}>{(c) =>
                            <StyledPaletteColor
                                colour={c}
                                onClick={() => { style[name] = c; setOpen(false); }}
                            />
                        }</For>
                    </StyledPaletteGrid>
                    <StyledHexInput
                        type="text"
                        placeholder={style[name]}
                        onKeyDown={e => { if (e.key === 'Enter') applyHex(e.target.value); }}
                    />
                </StyledPalette>
            </Show>
        </StyledColorRow>
    );
};

/* ─── Card style picker ──────────────────────────────────────── */

const StyledCardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
`;

const StyledCardOption = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    &:hover > div:first-child { filter: brightness(1.12); }
`;

const StyledActiveDot = styled.div`
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #E8932A;
    border: 1.5px solid rgba(255,255,255,0.75);
    pointer-events: none;
    z-index: 2;
`;

const StyledCardThumb = styled.div`
    width: 100%;
    position: relative;
    border-radius: 6px;
    border: 2px solid rgba(255,255,255,0.1);
    overflow: hidden;
    box-shadow: 0 3px 12px rgba(0,0,0,0.5);

    svg {
        display: block;
        width: 100%;
        height: auto;
        pointer-events: none;
    }
`;

const StyledCardLabel = styled.span`
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: capitalize;
    letter-spacing: 0.08em;
    color: ${props => props.active ? '#E8932A' : 'rgba(255,255,255,0.35)'};
    font-family: 'Cinzel', serif;
    text-align: center;
    transition: color 0.12s;
`;

/* ─── Themes grid ────────────────────────────────────────────── */

const StyledThemeGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`;

const StyledThemeOption = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    &:hover > div:first-child { filter: brightness(1.12); }
`;

const StyledThemeName = styled.span`
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${props => props.active ? '#E8932A' : 'rgba(255,255,255,0.35)'};
    font-family: 'Cinzel', serif;
    transition: color 0.12s;
`;

const StyledThemeThumb = styled.div`
    width: 100%;
    aspect-ratio: 5 / 3;
    border-radius: 5px;
    position: relative;
    border: 2px solid ${props => props.trim};
    overflow: hidden;
    display: flex;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
`;

const StyledThemeInfo = styled.div`
    flex: 1;
    background: ${props => props.fill};
    padding: 4px 5px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const StyledThemeLine = styled.div`
    height: 2px;
    border-radius: 1px;
    background: ${props => props.color};
    width: ${props => props.short ? '50%' : '80%'};
    opacity: ${props => props.faint ? 0.45 : 0.85};
`;

const StyledThemePortrait = styled.div`
    width: 34%;
    background: ${props => props.base};
`;

/* ─── Export footer ──────────────────────────────────────────── */

const StyledFooter = styled.div`
    padding: 1rem 1.1rem;
    border-top: 1px solid ${BORDER};
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    flex-shrink: 0;
`;

const StyledExportBtn = styled.button`
    width: 100%;
    padding: 0.6rem;
    border-radius: 8px;
    border: none;
    background: #E8932A;
    color: #0a0a0a;
    font-weight: 700;
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.15s;
    &:hover { background: #d4821e; }
    &:active { background: #c07518; }
`;

const StyledGhostBtn = styled.button`
    flex: 1;
    padding: 0.55rem;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.15);
    background: transparent;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
    font-size: 0.78rem;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
    &:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.9); }
`;

const StyledBtnRow = styled.div`
    display: flex;
    gap: 0.45rem;
`;

/* ─── Main component ─────────────────────────────────────────── */

const RightPanel = (props) => {
    const { style, state, type, setType } = useCard();
    const { cardRef, selected, setCards } = useSaved();
    const { mobile } = useApp();
    const [showShare, setShowShare] = createSignal(false);
    const [cardPreviews, setCardPreviews] = createStore({});

    onMount(() => {
        batch(() => {
            for (const cardType in CARDS) {
                let card = CARDS[cardType];
                while (typeof card === 'function') card = card();
                for (const field of card.querySelectorAll('.field').values()) {
                    const input = field.querySelector('input');
                    if (input) { input.readOnly = true; input.style.cursor = 'pointer'; }
                }
                for (const image of card.querySelectorAll('.image').values()) {
                    const svg = image.querySelector('svg');
                    if (svg) image.removeChild(svg);
                }
                setCardPreviews(cardType, card);
            }
        });
    });

    function applyTheme(t) {
        style.trim = t.trim;
        style.fill = t.fill;
        style.base = t.base;
        style.text = t.text;
    }

    function isActiveTheme(t) {
        return style.trim === t.trim && style.fill === t.fill && style.base === t.base;
    }

    return (
        <>
            <Show when={mobile() && props.onClose}>
                <StyledOverlay onClick={props.onClose}/>
            </Show>

            <StyledPanel>
                <StyledMobileHeader>
                    <StyledMobileTitle>Styles</StyledMobileTitle>
                    <StyledMobileClose onClick={props.onClose} aria-label="Close">✕</StyledMobileClose>
                </StyledMobileHeader>

                <StyledScroll>
                    <Section label="Colours">
                        <ColorPicker label="Trim"       name="trim"/>
                        <ColorPicker label="Fill"        name="fill"/>
                        <ColorPicker label="Base"        name="base"/>
                        <ColorPicker label="Text"        name="text"/>
                    </Section>

                    <Section label="Card Style">
                        <StyledCardList>
                            <For each={Object.keys(cardPreviews)}>{(cardType) =>
                                <StyledCardOption onClick={() => { setType(cardType); setCards(selected(), 'type', cardType); }}>
                                    <StyledCardThumb>
                                        {cardPreviews[cardType]}
                                        <Show when={type() === cardType}>
                                            <StyledActiveDot/>
                                        </Show>
                                    </StyledCardThumb>
                                    <StyledCardLabel active={type() === cardType}>{cardType}</StyledCardLabel>
                                </StyledCardOption>
                            }</For>
                        </StyledCardList>
                    </Section>

                    <Section label="Themes">
                        <StyledThemeGrid>
                            <For each={TEMPLATES}>{(t) =>
                                <StyledThemeOption onClick={() => applyTheme(t)}>
                                    <StyledThemeThumb trim={t.trim}>
                                        <StyledThemeInfo fill={t.fill}>
                                            <StyledThemeLine color={t.text}/>
                                            <StyledThemeLine color={t.trim} faint/>
                                            <StyledThemeLine color={t.trim} faint short/>
                                            <StyledThemeLine color={t.trim} faint/>
                                        </StyledThemeInfo>
                                        <StyledThemePortrait base={t.base}/>
                                        <Show when={isActiveTheme(t)}>
                                            <StyledActiveDot/>
                                        </Show>
                                    </StyledThemeThumb>
                                    <StyledThemeName active={isActiveTheme(t)}>{t.name}</StyledThemeName>
                                </StyledThemeOption>
                            }</For>
                        </StyledThemeGrid>
                    </Section>
                </StyledScroll>

                <StyledFooter>
                    <StyledExportBtn onClick={() => downloadPNG(cardRef(), state)}>
                        Export PNG
                    </StyledExportBtn>
                    <StyledBtnRow>
                        <StyledGhostBtn onClick={() => printCard(cardRef(), state)}>
                            Print / PDF
                        </StyledGhostBtn>
                        <StyledGhostBtn onClick={() => setShowShare(true)}>
                            Share link
                        </StyledGhostBtn>
                    </StyledBtnRow>
                </StyledFooter>

                <Show when={showShare()}>
                    <Share onClose={() => setShowShare(false)}/>
                </Show>
            </StyledPanel>
        </>
    );
};

export default RightPanel;
