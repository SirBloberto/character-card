import { styled } from 'solid-styled-components';
import { downloadJSON, downloadSVG } from '../utilities/download';
import Card from './card';
import Picker from './picker';
import { useCard } from '../context/card';
import Selector from './selector';
import { MOBILE_VERTICAL, MOBILE_WIDTH } from '../styles/variables';
import { useSaved } from '../context/saved';
import { Show, createEffect, createSignal, onMount } from 'solid-js';
import maximize from '../images/full-screen.webp';
import minimize from '../images/minus.webp';

const StyledMain = styled.div`
    margin: 1rem auto;
    padding: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    gap: 4rem;
    max-width: calc(100vh * (5/4));
    box-sizing: border-box;

    @media (max-width: ${MOBILE_WIDTH}px) {
        gap: 1rem;
    }

    @media (max-width: ${MOBILE_VERTICAL}px) {
        flex-direction: column-reverse;
        align-self: start;
        margin-top: 4rem;
        max-width: 100%;
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

    @media (max-width: ${MOBILE_VERTICAL}px) {
        width: 100%;
    }
`;

const StyledPicker = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 4fr 1fr;
    height: 13vh;
    row-gap: 0.5rem;

    @media (max-width: ${MOBILE_WIDTH}px) {
        height: 32vw;
    }
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
        width: 45%;
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

    @media (max-width: ${MOBILE_WIDTH}px) {
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
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
        document.onfullscreenchange = () => {
            if (!document.fullscreenElement)
                setFullscreen(false);
        }
    });

    createEffect(() => {
        let main = document.getElementById("editor-main");
        let editor = document.getElementById("editor-editor");
        let card = document.getElementById("editor-card");
        if(fullscreen()){
            document.getElementById("root").requestFullscreen();
            main.classList.add("fullscreen-main");
            editor.classList.add("fullscreen-editor");
            screen.orientation.lock('landscape').catch(e => {}); //Ignore if we are on desktop
        } else {
            if (!main || !editor || !card)
                return
            if (document.fullscreenElement)
                document.exitFullscreen();
            main.classList.remove("fullscreen-main");
            editor.classList.remove("fullscreen-editor");
            screen.orientation.unlock();
        }
    });

    function handleMouseChange() {
        setMouseMoved(true);
        clearTimeout(timer);
        timer = setTimeout(() => {setMouseMoved(false)}, 2000);
    }

    return (
        <StyledMain id="editor-main">
            <StyledEditor id="editor-editor">
                <Show when={!fullscreen()}>
                    <StyledPicker>
                        <Picker id={1} name={'trim'}/>        
                        <Picker id={2} name={'fill'}/>
                        <Picker id={3} name={'base'}/>
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
                <StyledFullscreen src={maximize} onclick={() => setFullscreen(true)}/>
            </Show>
            <Show when={fullscreen() && mouseMoved()}>
                <StyledFullscreen src={minimize} onclick={() => setFullscreen(false)}/>
            </Show>
        </StyledMain>
    );
}

export default Editor;