import { styled } from 'solid-styled-components';
import GlobalStyle from './styles/global'
import Editor from './components/editor';
import { CardProvider } from './context/card';
import { SavedProvider } from './context/saved';
import SavedCards from './components/saved/cards';
import { Show, createSignal, onMount } from 'solid-js';
import { MOBILE_WIDTH } from './styles/variables';
import rotate from './images/rotate.webp';

const StyledMain = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
`;

const StyledRotate = styled.div`
    font-size: 2rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    img {
        width: 100px;
        height: 100px;
    }
`;

const App = () => {
    const [landscape, setLandscape] = createSignal(true);

    //Need to account for fullscreen
    onMount(() => {
        setLandscape(window.screen.orientation.type.includes("landscape") && window.screen.width < MOBILE_WIDTH);
        window.screen.orientation.onchange = (event) => setLandscape(event.target.type.includes("landscape") && window.screen.width < MOBILE_WIDTH);
    });

    return (
        <StyledMain>
            <SavedProvider>
                <CardProvider>
                    <Show when={!landscape()}>
                        <SavedCards/>
                        <Editor/>
                    </Show>
                </CardProvider>
            </SavedProvider>
            <GlobalStyle/>
            <Show when={landscape()}>
                <StyledRotate>
                    <img src={rotate}/>
                    Please rotate your device
                </StyledRotate>
            </Show>
        </StyledMain>
    );
}

export default App;