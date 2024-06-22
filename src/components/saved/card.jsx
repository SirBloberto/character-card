import { styled } from "solid-styled-components";
import { useSaved } from '../../context/saved';
import cross from '../../images/cross.webp';
import edit from '../../images/edit.webp';
import { modifyMutable, produce, reconcile, unwrap } from 'solid-js/store';
import { useCard } from "../../context/card";
import { saveStatic, saveDynamic } from "../../utilities/save";
import { batch, createSignal } from 'solid-js';
import { toDefault } from "../../utilities/load";
import { MOBILE_WIDTH } from "../../styles/variables";

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
    font-size: 1.5rem;
    padding-left: 1rem;
    display: flex;
    align-items: start;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    line-height: 1;

    &:hover {
        cursor: pointer;
    }

    @media (max-width: ${MOBILE_WIDTH}px) {
        width: 175px;
    }
`;

const StyledClass = styled.div`
    font-size: 0.65rem;
    margin-left: 0.2rem;
`;

const StyledDelete = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    margin: auto;

    &:hover {
        cursor: pointer;
        filter: brightness(90%);
    }
`;

const StyledEdit = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    margin: auto;
`;

const SavedCard = ({ card, index }) => {
    const { cards, setCards, selected, setSelected } = useSaved();
    const { state, style, type, setType } = useCard();
    const [hover, setHover] = createSignal(false);

    function changeCard() {
        if (selected() == index())
            return;
        batch(() => {
            setCards(selected(), saveStatic(state, style, type()));
            modifyMutable(state, reconcile(cards[index()]['state']));
            modifyMutable(style, reconcile(cards[index()]['style']));
            setType(cards[index()]['type']);
            setSelected(index());
            setCards(index(), saveDynamic(state, style, type()));
            setHover(false);
        });
    }

    function deleteCard() {
        batch(() => {
            setCards(produce((cards) => cards.splice(index(), 1)));
            if (selected() != 0 && index() <= selected()) {
                setSelected(selected() - 1);
                modifyMutable(state, reconcile(cards[selected()]['state']));
                modifyMutable(style, reconcile(cards[selected()]['style']));
                setType(cards[selected()]['type']);
            } else if (cards.length == 0) {
                modifyMutable(state, reconcile(toDefault(state)));
                style['trim'] = 'rgb(0, 0, 0)';
                style['base'] = 'rgb(216, 216, 216)';
                style['fill'] = 'rgb(150, 150, 150)';
                setSelected(0);
            }
            setCards(selected(), saveDynamic(state, style, type()));
        });
    }

    return (
        <StyledOuterCard base={card['style']['base']} trim={card['style']['trim']} on:mouseenter={() => setHover(true)} on:mouseleave={() => setHover(false)}>
            <StyledInnerCard onClick={() => changeCard()} fill={card['style']['fill']} trim={card['style']['trim']}>
                {card['state']['name']}
                <Show when={card['state']['class'] != ''}>
                    <StyledClass>{card['state']['class']}</StyledClass>
                </Show>
            </StyledInnerCard>
            <Show when={hover()}>
                <StyledDelete src={cross} alt="delete" onClick={() => deleteCard()}/>
            </Show>
            <Show when={selected() == index() && !hover()}>
                <StyledEdit src={edit} alt="edit"/>
            </Show>
        </StyledOuterCard>
    )
}

export default SavedCard;