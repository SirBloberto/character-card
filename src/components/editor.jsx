import { styled } from 'solid-styled-components';
import { downloadJSON, downloadSVG } from '../utilities/download';
import Card from './card';
import Picker from './picker';
import { useCard } from '../context/card';
import Selector from './selector';
import { MOBILE_WIDTH } from '../styles/variables';
import { useSaved } from '../context/saved';
import { Show, createEffect, createSignal, onMount } from 'solid-js';

const StyledMain = styled.div`
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    gap: 4rem;
    margin: 2rem;

    @media (max-width: ${MOBILE_WIDTH}px) {
        gap: 0;
    }
`;

const StyledEditor = styled.div`
    width: 90%;
    min-width: 200px;
    max-width: 950px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;

    @media (max-width: ${MOBILE_WIDTH}px) {
        gap: 0.5rem;
    }
`;

const StyledPicker = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const StyledButton = styled.button`
    padding: 1rem;
    border-radius: 20px;
    margin: auto;
    width: 65%;
    border: solid 1px #da7c0c;
    background: linear-gradient(180deg, #faa51a, #f47a20);
    box-shadow: 0px 2px 5px #cc7000;

    &:hover {
        cursor: pointer;
        background: linear-gradient(180deg, #f88e11, #f06015);
    }

    @media (max-width: ${MOBILE_WIDTH}px) {
        width: 30%;
        padding: 0.75rem;
        margin: 0;
    }
`;

const StyledFooter = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (max-width: ${MOBILE_WIDTH}px) {
        display: flex;
        justify-content: center;
    }
`;

const StyledCard = styled.div`
    width: 100%;
    align-self: center;

    @media (max-width: ${MOBILE_WIDTH}px) {
        width: 75%;
    }
`;

const StyledFullscreen = styled.img`
    width: 50px;
    height: 50px;
    top: 25px;
    right: 25px;
    position: absolute;

    &:hover {
        cursor: pointer;
    }
`;

const Editor = () => {
    const { state, style, type } = useCard();
    const { fullscreen, setFullscreen } = useSaved();
    const [mouseMoved, setMouseMoved] = createSignal(false);

    let svg = <Card/>

    let timer;
    onMount(() => {
        document.onmousemove = () => handleMouseChange();
        document.onmousedown = () => handleMouseChange();
    });

    createEffect(() => {
        let main = document.getElementById("editor-main");
        let editor = document.getElementById("editor-editor");
        let card = document.getElementById("editor-card");
        if(fullscreen()){
            main.classList.add("fullscreen-main");
            editor.classList.add("fullscreen-editor");
            card.classList.add("fullscreen-card");
        } else {
            main.classList.remove("fullscreen");
            editor.classList.remove("fullscreen-editor");
            card.classList.remove("fullscreen-card");
        }
    });

    function handleMouseChange() {
        setMouseMoved(true);
        clearTimeout(timer);
        timer = setTimeout(() => {setMouseMoved(false)}, 1500);
    }

    return (
        <StyledMain id="editor-main">
            <StyledEditor id="editor-editor">
                <Show when={!fullscreen()}>
                    <StyledPicker>
                        <Picker name={'trim'}/>        
                        <Picker name={'fill'}/>
                        <Picker name={'base'}/>
                    </StyledPicker>
                </Show>
                <StyledCard id="editor-card">
                    <Card ref={svg}/>
                </StyledCard>
                <Show when={!fullscreen()}>
                    <StyledFooter>
                        <StyledButton onClick={() => downloadSVG(svg, state)}>Download SVG</StyledButton>
                        <StyledButton onClick={() => downloadJSON(state, style, type)}>Download JSON</StyledButton>
                    </StyledFooter>
                </Show>
            </StyledEditor>
            <Show when={!fullscreen()}>
                <Selector/>
                <StyledFullscreen src={"full-screen.webp"} onclick={() => setFullscreen(true)}/>
            </Show>
            <Show when={fullscreen() && mouseMoved()}>
                <StyledFullscreen src={"minus.webp"} onclick={() => setFullscreen(false)}/>
            </Show>
        </StyledMain>
    );
}

export default Editor;