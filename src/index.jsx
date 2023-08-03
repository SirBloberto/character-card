import { render } from 'solid-js/web';
import { styled } from 'solid-styled-components';
import GlobalStyle from './styles/global'
import Editor from './components/editor';
import { CardProvider } from './context/card';


const StyledMain = styled.div`
    display: flex;
`;


const Index = () => {
    return (
        <StyledMain id='character-card-parent'>
            <CardProvider>
                <Editor/>
            </CardProvider>
            <GlobalStyle />
        </StyledMain>
    );
}

render(() => (
    <Index />
), document.getElementById('root'));