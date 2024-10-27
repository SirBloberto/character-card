import { For, onMount, batch } from 'solid-js';
import { CARDS } from '../utilities/load';
import { createStore, modifyMutable, reconcile } from 'solid-js/store';
import { styled } from 'solid-styled-components';
import { useCard } from '../context/card';
import { useSaved } from '../context/saved';
import { MOBILE_WIDTH, MOBILE_VERTICAL } from '../styles/variables';

const StyledSelector = styled.div`
    margin-top: calc(15vh + 1rem);
    display: flex;
    flex-direction: column;
    width: 200px;
    gap: 1rem;

    @media (max-width: ${MOBILE_WIDTH}px) {
        width: 125px;
    }

    @media (max-width: ${MOBILE_VERTICAL}px) {
        box-sizing: border-box;
        flex-direction: row;
        width: 100%;
        height: 150px;
        justify-content: center;
        gap: 4rem;
        margin: 0;
    }
`;

const StyledType = styled.div`
    cursor: pointer;

    @media (max-width: ${MOBILE_VERTICAL}px) {
        width: 200px;
    }
`;

const Selector = () => {
    const [options, setOptions] = createStore({});
    const { setType } = useCard();
    const { selected, setCards } = useSaved();

    onMount(() => {
        batch(() => {
            for(const type in CARDS)
                setOptions(type, disable(CARDS[type]));
        });
    });

    function disable(card) {
        while(typeof(card) == 'function')
            card = card()
        let fields = card.querySelectorAll('.field');
        for (const field of fields.values()) {
            let input = field.querySelector('input')
            input.readOnly = true;
            input.style.cursor = "pointer";
        }
        let images = card.querySelectorAll('.image');
        for (const image of images.values())
            image.removeChild(image.querySelector('svg'));
        return card;
    }
    
    return (
        <StyledSelector>
            <For each={Object.keys(options)}>{(card) => 
                <StyledType onclick={() => {setType(card); setCards(selected(), 'type', reconcile(card));}}>
                    {options[card]}
                </StyledType>
            }</For>
        </StyledSelector>
    );
}

export default Selector;