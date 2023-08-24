import { styled } from "solid-styled-components";
import { useSaved } from '../../context/saved';
import cross from '/cross.webp';
import edit from '/edit.webp';
import { produce } from 'solid-js/store';
import { useCard } from "../../context/card";
import { saveStatic, saveDynamic } from "../../utilities/save";
import { batch, createSignal } from 'solid-js';

const StyledOuterCard = styled.div`
    width: 100%;
    height: 50px;

    background-color: ${props => props.base};
    border-radius: 10px;
    border: 2px solid ${props => props.trim};
    box-sizing: border-box;
    display: flex;
`;

const StyledInnerCard = styled.div`
    width: 225px;
    height: 100%;

    background-color: ${props => props.fill};
    border-radius: 10px;
    outline: 2px solid ${props => props.trim};
    color: ${props => props.trim};
    box-sizing: border-box;
    font-size: 2rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    overflow: hidden;

    &:hover {
        cursor: pointer;
    }
`;

const StyledDelete = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    margin: auto;

    &:hover {
        cursor: pointer;
    }
`;

const StyledEdit = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    margin: auto;

    transition: opacity 0.3s ease-out;
`;

const SavedCard = ({ card, index }) => {
    const { cards, setCards, selected, setSelected } = useSaved();
    const { state, style, type } = useCard();
    const [hover, setHover] = createSignal(false);

    function changeCard() {
        if (selected() == index())
            return;
        batch(() => {
            setCards(selected(), saveStatic(state, style, type));
            for (const key in state)
                state[key] = cards[index()]['state'][key];
            style['trim'] = cards[index()]['style']['trim'];
            style['base'] = cards[index()]['style']['base'];
            style['fill'] = cards[index()]['style']['fill'];
            setSelected(index());
            setCards(index(), saveDynamic(state, style, type));
            setHover(false);
        });
    }

    const deleteCard = (index) => {
        batch(() => {
            setCards(produce((cards) => cards.splice(index(), 1)));
            if (selected() != 0)
                setSelected(selected() - 1);
            else if (cards.length == 0) {
                for (const key in state)
                    state[key] = '';
                style['trim'] = 'rgb(0, 0, 0)';
                style['base'] = 'rgb(216, 216, 216)';
                style['fill'] = 'rgb(150, 150, 150)';
                setSelected(0);
            }
            setCards(selected(), saveDynamic(state, style, type));
        });
    }

    return (
        <StyledOuterCard base={card['style']['base']} trim={card['style']['trim']} on:mouseenter={() => setHover(true)} on:mouseleave={() => setHover(false)}>
            <StyledInnerCard onClick={() => changeCard()} fill={card['style']['fill']} trim={card['style']['trim']}>
                {card['state']['name']}
            </StyledInnerCard>
            <Show when={hover()}>
                <StyledDelete src={cross} onClick={() => deleteCard(index)}/>
            </Show>
            <Show when={selected() == index() && !hover()}>
                <StyledEdit src={edit} />
            </Show>
        </StyledOuterCard>
    )
}

export default SavedCard;