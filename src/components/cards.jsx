import { onMount } from 'solid-js';
import { styled } from 'solid-styled-components';
import { useSaved } from '../context/saved';
import { CardProvider } from '../context/card';
import CharacterCard from '../cards/basic';

const StyledCards = styled.div`
    height: 100%;
    min-width: 300px;
    position: relative;
    z-index: 1;
    top: 0;
    left: 0;
`;

const Cards = () => {
    const { saved, setSaved } = useSaved();

    onMount(() => {
        if (!window.localStorage.getItem("character-card"))
            window.localStorage.setItem("character-card", JSON.stringify(saved))
        console.log(window.localStorage);
        setSaved(JSON.parse(window.localStorage.getItem("character-card")));
    })

    return (
        <StyledCards>
            <h2>Cards</h2>
            <For each={saved}>
                <CardProvider>
                    Card
                    <CharacterCard/>
                </CardProvider>
            </For>
        </StyledCards>
    );
}

export default Cards;