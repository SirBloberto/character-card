import { styled } from 'solid-styled-components';
import { downloadJSON, downloadSVG } from '../utilities/download';
import Card from './card';
import Picker from './picker';
import { useCard } from '../context/card';
import Selector from './selector';

const StyledEditor = styled.div`
    width: 90%;
    min-width: 450px;
    max-width: 950px;
`;

const StyledPicker = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 1rem;
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
`;

const StyledFooter = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const StyledMain = styled.div`
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    gap: 4rem;
    margin: 2rem;
`;

const Editor = () => {
    const { state, style, type } = useCard();

    let svg = <Card/>

    return (
        <StyledMain>
            <StyledEditor>
                <StyledPicker>
                    <Picker name={'trim'}/>        
                    <Picker name={'fill'}/>
                    <Picker name={'base'}/>
                </StyledPicker>

                <Card ref={svg}/>

                <StyledFooter>
                    <StyledButton onClick={() => downloadSVG(svg, state)}>Download SVG</StyledButton>
                    <StyledButton onClick={() => downloadJSON(state, style, type)}>Download JSON</StyledButton>
                </StyledFooter>
            </StyledEditor>
            <Selector/>
        </StyledMain>
    );
}

export default Editor;