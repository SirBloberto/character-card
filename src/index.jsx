import { render } from 'solid-js/web';
import { styled } from 'solid-styled-components';
import GlobalStyle from './styles/global'
import Editor from './components/editor';
import { CardProvider } from './context/card';
import { SavedProvider } from './context/saved';
import SavedCards from './components/saved/cards';


const StyledMain = styled.div`
    display: flex;
`;


const Index = () => {
    return (
        <StyledMain>
            <SavedProvider>
                <CardProvider>
                    <SavedCards/>
                    <Editor/>
                </CardProvider>
            </SavedProvider>
            <GlobalStyle />
        </StyledMain>
    );
}

render(() => (
    <Index />
), document.getElementById('root'));