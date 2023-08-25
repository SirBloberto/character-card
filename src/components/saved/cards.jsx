import { useSaved } from '../../context/saved';
import { onMount, For, createEffect, batch } from 'solid-js';
import { styled } from 'solid-styled-components';
import SavedCard from './card';
import { useCard } from '../../context/card';
import { saveStatic, saveDynamic } from '../../utilities/save';
import plus from '../../images/plus.webp';

const StyledCards = styled.div`
    min-width: 275px;
    height: 100%;
    align-self: flex-start;
    background-color: #444;
    overflow: auto;
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
`;

const StyledNew = styled.img`
    width: 25px;
    height: 25px;

    &:hover {
        cursor: pointer;
    }
`;

const SavedCards = () => {
    const { cards, setCards, selected, setSelected } = useSaved();
    const { state, style, type } = useCard();

    onMount(() => {
        let storage = JSON.parse(window.localStorage.getItem('character-card'));

        if (!storage)
            storage = {};
        if (!storage['cards'])
            storage['cards'] = [];
        if (storage['cards'].length == 0)
            storage['cards'] = [saveDynamic(state, style, type)];

        if (!storage['selected'])
            storage['selected'] = 0;

        batch(() => {
            for (const index in storage['cards'])
                setCards(index, storage['cards'][index]);
            setSelected(storage['selected']);
            for (const key in cards[selected()]['state'])
                state[key] = cards[selected()]['state'][key];
            style['trim'] = cards[selected()]['style']['trim'];
            style['fill'] = cards[selected()]['style']['fill'];
            style['base'] = cards[selected()]['style']['base'];
            setCards(selected(), saveDynamic(state, style, type));
        });
    })

    function newCard() {
        batch(() => {
            setCards(selected(), saveStatic(state, style, type));
            for (const key in state)
                state[key] = '';
            style['trim'] = 'rgb(0, 0, 0)';
            style['base'] = 'rgb(216, 216, 216)';
            style['fill'] = 'rgb(150, 150, 150)';
            setCards(cards.length, saveDynamic(state, style, type));
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
        <StyledCards>
            <StyledHeader>
                Saved Cards
                <StyledNew src={plus} onClick={() => newCard()}></StyledNew>
            </StyledHeader>
            <For each={cards}>{(card, index) => 
                <SavedCard card={card} index={index}/>
            }</For>
            
        </StyledCards>
    );
}

export default SavedCards;