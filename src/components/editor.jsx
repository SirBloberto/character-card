import { styled } from 'solid-styled-components';
import { downloadJSON, downloadSVG } from '../utilities/download';
import Card from './card';
import Picker from './picker';
import { useCard } from '../context/card';
import Selector from './selector';
import { MOBILE_WIDTH } from '../styles/variables';

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

const StyledMain = styled.div`
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-self: center;
    gap: 4rem;
    margin: 2rem;

    @media (max-width: ${MOBILE_WIDTH}px) {
        gap: 2rem;
    }
`;

const StyledCard = styled.div`
    width: 100%;
    align-self: center;

    @media (max-width: ${MOBILE_WIDTH}px) {
        width: 80%;
    }
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
                <StyledCard>
                    <Card ref={svg}/>
                </StyledCard>
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