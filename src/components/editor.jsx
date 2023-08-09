import { styled } from 'solid-styled-components';
import download from '../utilities/download';
import save from '../utilities/save'
import { useCard } from '../context/card';
import Card from './card';
import Picker from './picker';

const StyledEditor = styled.div`
    position: fixed;
    bottom: 30px;
    left: 25%;
    width: 940px;
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
    width: 200px;
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
                <StyledButton onClick={() => download(svg)}>Download</StyledButton>
                <StyledButton onClick={() => save(state, style, type())}>Save</StyledButton>
            </StyledFooter>
        </StyledEditor>
    );
}

export default Editor;