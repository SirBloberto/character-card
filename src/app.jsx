import { styled } from 'solid-styled-components';
import GlobalStyle from './styles/global'
import Editor from './components/editor';
import { CardProvider } from './context/card';
import { SavedProvider } from './context/saved';
import SavedCards from './components/saved/cards';
import { Show } from 'solid-js';
import rotate from './images/rotate.webp';
import { useApp } from './context/app';

const StyledMain = styled.main`
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
    const { landscape, mobile } = useApp();

    return (
        <StyledMain>
            <SavedProvider>
                <CardProvider>
                    <Show when={!mobile() || (!landscape() && mobile())}>
                        <SavedCards/>
                        <Editor/>
                    </Show>
                </CardProvider>
            </SavedProvider>
            <GlobalStyle/>
            <Show when={landscape() && mobile()}>
                <StyledRotate>
                    <img src={rotate}/>
                    Please rotate your device
                </StyledRotate>
            </Show>
        </StyledMain>
    );
}

export default App;