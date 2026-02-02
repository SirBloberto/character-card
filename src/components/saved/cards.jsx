import { useSaved } from '../../context/saved';
import { onMount, For, createEffect, batch, Show, createSignal } from 'solid-js';
import { styled } from 'solid-styled-components';
import SavedCard from './card';
import { useCard } from '../../context/card';
import { saveStatic, saveDynamic } from '../../utilities/save';
import plus from '../../images/plus.webp';
import { modifyMutable, reconcile } from 'solid-js/store';
import { toDefault } from '../../utilities/load';
import { MOBILE_WIDTH, MOBILE_VERTICAL } from '../../styles/variables';
import { useApp } from '../../context/app';
import burger from '../../images/burger.webp';
import cross from '../../images/cross.webp';

const StyledCards = styled.div`
    min-width: 275px;
    height: 100%;
    align-items: flex-start;
    background-color: #444;
    overflow: auto;
    box-shadow: 2px 0px 5px #000;

    @media (max-width: ${MOBILE_WIDTH}px) {
        min-width: 225px;
    }

    @media (max-width: ${MOBILE_VERTICAL}px) {
        min-width: 100%;
        position: absolute;
        z-index: 2;
    }
`;

const StyledHeader = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: inset 0 -2px #ffffff;
    padding: 1rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
        gap: 0.5rem;
    }
`;

const StyledButton = styled.img`
    width: 25px;
    height: 25px;

    &:hover {
        cursor: pointer;
        filter: brightness(90%);
    }
`;

const StyledBurger = styled.img`
    width: 40px;
    height: 40px;
    top: 10px;
    left: 10px;
    position: absolute;

    &:hover {
        cursor: pointer;
    }
`;

const SavedCards = () => {
    const { cards, setCards, selected, setSelected, fullscreen } = useSaved();
    const { state, style, type, setType } = useCard();
    const { mobile } = useApp();
    const [open, setOpen] = createSignal(false);
    
    onMount(() => {
        let storage = JSON.parse(window.localStorage.getItem('character-card'));

        if (!storage)
            storage = {};
        if (!storage['cards'])
            storage['cards'] = [];
        if (storage['cards'].length == 0)
            storage['cards'] = [saveStatic(state, style, type())];

        if (!storage['selected'])
            storage['selected'] = 0;

        batch(() => {
            for (const index in storage['cards'])
                setCards(index, storage['cards'][index]);
            setSelected(storage['selected']);
            modifyMutable(state, reconcile(cards[selected()]['state']));
            modifyMutable(style, reconcile(cards[selected()]['style']));
            setType(cards[selected()]['type']);
            setCards(selected(), saveDynamic(state, style, type()));
        });
    })

    function newCard() {
        batch(() => {
            setCards(selected(), saveStatic(state, style, type()));
            modifyMutable(state, reconcile(toDefault(state)));
            style['trim'] = 'rgb(0, 0, 0)';
            style['base'] = 'rgb(216, 216, 216)';
            style['fill'] = 'rgb(150, 150, 150)';
            setCards(cards.length, saveDynamic(state, style, type()));
            setSelected(cards.length - 1);
        });
    }

    createEffect(() => {
        let data = {};
        data['cards'] = cards;
        data['selected'] = selected();
        data = JSON.stringify(data);
        window.localStorage.setItem('character-card', data);
    });

    return (
        <>
            <Show when={!fullscreen() && mobile() && !open()}>
                <StyledBurger src={burger} alt="burger" onClick={() => setOpen(true)}/>
            </Show>
            <Show when={(!fullscreen() && mobile() && open()) || (!fullscreen() && !mobile())}>
                <StyledCards>
                    <StyledHeader>
                        Saved Cards
                        <div>
                            <StyledButton src={plus} alt="new" onClick={() => newCard()}/>
                            <Show when={mobile() && open()}>
                                <StyledButton src={cross} alt="cross" onClick={() => setOpen(false)}/>
                            </Show>
                        </div>
                    </StyledHeader>
                    <For each={cards}>{(card, index) => 
                        <SavedCard card={card} index={index}/>
                    }</For>
                </StyledCards>
            </Show>
        </>

    );
}

export default SavedCards;