import { styled } from 'solid-styled-components';
import { downloadJSON, downloadSVG } from '../utilities/download';
import Card from './card';
import Picker from './picker';
import { useCard } from '../context/card';

const StyledEditor = styled.div`
    margin: auto;
    width: 50%;
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
`;

const StyledFooter = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const Editor = () => {
    const { state, style, type } = useCard();

    let svg = <Card/>

    return (
        <StyledEditor>
            <StyledPicker>
                <Picker name={'trim'}/>        
                <Picker name={'fill'}/>
                <Picker name={'base'}/>
            </StyledPicker>

            <Card ref={svg}/>

            <StyledFooter>
                <StyledButton onClick={() => downloadSVG(svg)}>Download SVG</StyledButton>
                <StyledButton onClick={() => downloadJSON(state, style, type)}>Download JSON</StyledButton>
            </StyledFooter>
        </StyledEditor>
    );
}

export default Editor;