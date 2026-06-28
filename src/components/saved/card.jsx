import { styled } from "solid-styled-components";
import { useSaved } from '../../context/saved';
import cross from '../../images/cross.webp';
import { modifyMutable, produce, reconcile } from 'solid-js/store';
import { useCard } from "../../context/card";
import { saveStatic, saveDynamic } from "../../utilities/save";
import { batch, createSignal, Show } from 'solid-js';
import { toDefault } from "../../utilities/load";

const StyledCard = styled.div`
    width: 100%;
    border-radius: 8px;
    border: 2px solid ${props => props.active ? '#E8932A' : 'transparent'};
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    transition: border-color 0.12s ease, filter 0.12s ease;

    &:hover {
        filter: brightness(1.1);
    }
`;

const StyledThumbTop = styled.div`
    height: 42px;
    background-color: ${props => props.fill};
    display: flex;
    align-items: flex-start;
    padding: 6px 8px 0;
    gap: 5px;
    position: relative;
`;

const StyledThumbDot = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.color};
    opacity: 0.8;
    flex-shrink: 0;
    margin-top: 1px;
`;

const StyledThumbLine = styled.div`
    height: 3px;
    border-radius: 2px;
    background: ${props => props.color};
    opacity: 0.55;
    flex: 1;
    margin-top: 2px;
`;

const StyledCardName = styled.div`
    position: absolute;
    bottom: 5px;
    left: 8px;
    right: 8px;
    font-size: 0.66rem;
    font-weight: 700;
    font-family: 'Cinzel', serif;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.92);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 1px 4px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.7);
`;

const StyledThumbBottom = styled.div`
    height: 14px;
    background-color: ${props => props.base};
`;

const StyledDeleteBtn = styled.img`
    width: 16px;
    height: 16px;
    position: absolute;
    top: 5px;
    right: 5px;
    opacity: 0;
    transition: opacity 0.12s ease;
    border-radius: 4px;
    background: rgba(0,0,0,0.5);
    padding: 2px;
    box-sizing: border-box;

    ${StyledCard}:hover & {
        opacity: 1;
        cursor: pointer;
    }
`;

const SavedCard = ({ card, index, onSelect }) => {
    const { cards, setCards, selected, setSelected } = useSaved();
    const { state, style, type, setType } = useCard();

    function changeCard() {
        if (selected() === index()) return;
        batch(() => {
            setCards(selected(), saveStatic(state, style, type()));
            modifyMutable(state, reconcile(cards[index()]['state']));
            modifyMutable(style, reconcile(cards[index()]['style']));
            setType(cards[index()]['type']);
            setSelected(index());
            setCards(index(), saveDynamic(state, style, type()));
        });
        onSelect?.();
    }

    function deleteCard(e) {
        e.stopPropagation();
        batch(() => {
            setCards(produce((cards) => cards.splice(index(), 1)));
            if (selected() !== 0 && index() <= selected()) {
                setSelected(selected() - 1);
                modifyMutable(state, reconcile(cards[selected()]['state']));
                modifyMutable(style, reconcile(cards[selected()]['style']));
                setType(cards[selected()]['type']);
            } else if (cards.length === 0) {
                modifyMutable(state, reconcile(toDefault(state)));
                style['trim'] = '#E8932A';
                style['fill'] = '#22222e';
                style['base'] = '#16161f';
                style['text'] = '#f0eefc';
                setSelected(0);
            }
            setCards(selected(), saveDynamic(state, style, type()));
        });
    }

    return (
        <StyledCard active={selected() === index()} onClick={changeCard}>
            <StyledThumbTop fill={card['style']['fill'] || '#22222e'}>
                <StyledThumbDot color={card['style']['trim'] || '#E8932A'}/>
                <StyledThumbLine color={card['style']['trim'] || '#E8932A'}/>
                <StyledThumbLine color={card['style']['trim'] || '#E8932A'} style={{flex: '0.5'}}/>
                <StyledCardName>
                    {card['state']['name'] || 'Unnamed'}
                </StyledCardName>
            </StyledThumbTop>
            <StyledThumbBottom base={card['style']['base'] || '#16161f'}/>
            <StyledDeleteBtn src={cross} alt="delete" onClick={deleteCard}/>
        </StyledCard>
    );
}

export default SavedCard;
