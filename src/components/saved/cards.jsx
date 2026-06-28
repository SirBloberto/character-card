import { useSaved } from '../../context/saved';
import { onMount, For, createEffect, batch, Show, createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';
import SavedCard from './card';
import { useCard } from '../../context/card';
import { saveStatic, saveDynamic } from '../../utilities/save';
import { modifyMutable, reconcile } from 'solid-js/store';
import { toDefault } from '../../utilities/load';
import { useApp } from '../../context/app';
import { decodeCard, loadFromAPI } from '../../utilities/share';
import burger from '../../images/burger.webp';
import cross from '../../images/cross.webp';

const StyledCards = styled.div`
    width: 240px;
    min-width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #2a2a34;
    overflow: hidden;
    box-shadow: 1px 0 0 rgba(255,255,255,0.08);
    flex-shrink: 0;
`;

const StyledHeader = styled.div`
    padding: 0.9rem 1rem 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const StyledBrand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.45rem;
`;

const StyledBrandIcon = styled.img`
    width: 24px;
    height: 24px;
    opacity: 0.9;
`;

const StyledBrandName = styled.h1`
    font-size: 1.1rem;
    font-weight: 700;
    font-family: 'Cinzel', serif;
    color: #E8932A;
    letter-spacing: 0.05em;
    line-height: 1;
`;

const StyledCardList = styled.div`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
`;

const StyledNewCard = styled.button`
    margin: 0.5rem;
    padding: 0.55rem;
    border-radius: 8px;
    border: 1.5px dashed rgba(255,255,255,0.18);
    background: transparent;
    color: rgba(255,255,255,0.4);
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.15s ease, color 0.15s ease;

    &:hover {
        border-color: #E8932A;
        color: #E8932A;
    }
`;

const StyledIconButton = styled.img`
    width: 18px;
    height: 18px;
    opacity: 0.65;
    transition: opacity 0.12s ease;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }
`;

const StyledBurger = styled.img`
    width: 34px;
    height: 34px;
    top: 10px;
    left: 10px;
    position: absolute;
    opacity: 0.85;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }
`;

const SavedCards = () => {
    const { cards, setCards, selected, setSelected, fullscreen } = useSaved();
    const { state, style, type, setType } = useCard();
    const { mobile } = useApp();
    const [open, setOpen] = createSignal(false);

    onMount(() => {
        let storage;
        try {
            storage = JSON.parse(window.localStorage.getItem('character-card'));
        } catch {
            storage = null;
        }

        if (!storage) storage = {};
        if (!storage['cards']) storage['cards'] = [];
        if (storage['cards'].length === 0)
            storage['cards'] = [saveStatic(state, style, type())];
        if (!storage['selected']) storage['selected'] = 0;

        batch(() => {
            for (const index in storage['cards'])
                setCards(index, storage['cards'][index]);
            setSelected(storage['selected']);
            modifyMutable(state, reconcile(cards[selected()]['state']));
            modifyMutable(style, reconcile(cards[selected()]['style']));
            setType(cards[selected()]['type']);
            setCards(selected(), saveDynamic(state, style, type()));
        });

        function applyShared(shared) {
            if (!shared?.v) return;
            window.history.replaceState({}, '', window.location.pathname);
            batch(() => {
                setCards(selected(), saveStatic(state, style, type()));
                modifyMutable(state, reconcile(shared.state ?? {}));
                if (shared.style) {
                    style.trim = shared.style.trim ?? style.trim;
                    style.fill = shared.style.fill ?? style.fill;
                    style.base = shared.style.base ?? style.base;
                    style.text = shared.style.text ?? style.text;
                }
                if (shared.type) setType(shared.type);
                setCards(cards.length, saveDynamic(state, style, type()));
                setSelected(cards.length - 1);
            });
        }

        const params = new URLSearchParams(window.location.search);
        const codeParam = params.get('code');
        const shareParam = params.get('share');

        if (codeParam) {
            loadFromAPI(codeParam).then(applyShared).catch(() => {});
        } else if (shareParam) {
            applyShared(decodeCard(shareParam));
        }
    });

    function newCard() {
        batch(() => {
            setCards(selected(), saveStatic(state, style, type()));
            modifyMutable(state, reconcile(toDefault(state)));
            style['trim'] = '#E8932A';
            style['fill'] = '#22222e';
            style['base'] = '#16161f';
            style['text'] = '#f0eefc';
            setCards(cards.length, saveDynamic(state, style, type()));
            setSelected(cards.length - 1);
        });
    }

    let saveTimer;
    createEffect(() => {
        const data = JSON.stringify({ cards, selected: selected() });
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            window.localStorage.setItem('character-card', data);
        }, 400);
    });

    return (
        <>
            <Show when={!fullscreen() && mobile() && !open()}>
                <StyledBurger src={burger} alt="menu" onClick={() => setOpen(true)}/>
            </Show>
            <Show when={(!fullscreen() && mobile() && open()) || (!fullscreen() && !mobile())}>
                <StyledCards>
                    <StyledHeader>
                        <StyledBrand>
                            <StyledBrandIcon src="/icon.svg" alt="CharacterForge"/>
                            <StyledBrandName>CharacterForge</StyledBrandName>
                        </StyledBrand>
                        <Show when={mobile() && open()}>
                            <StyledIconButton src={cross} alt="close" onClick={() => setOpen(false)}/>
                        </Show>
                    </StyledHeader>
                    <StyledCardList>
                        <For each={cards}>{(card, index) =>
                            <SavedCard card={card} index={index} onSelect={() => setOpen(false)}/>
                        }</For>
                    </StyledCardList>
                    <StyledNewCard onClick={() => newCard()}>
                        + New card
                    </StyledNewCard>
                </StyledCards>
            </Show>
        </>
    );
}

export default SavedCards;
