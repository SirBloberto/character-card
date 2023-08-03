import { styled } from 'solid-styled-components';
import download from '../utilities/download';
import save from '../utilities/save'
import { useCard } from '../context/card';
import Card from './card';
import { ChromePicker } from 'solid-color';

const StyledEditor = styled.div`
    
`;

const StyledPicker = styled.div`
    display: flex;  
`;

const StyledButton = styled.button`
    padding: 1rem;
    border-radius: 50px;
    width: 200px;
`;


const Editor = () => {
    const { state, style, type } = useCard();

    let svg = <Card/>

    return (
        <StyledEditor>
            <StyledPicker>            
                <ChromePicker color={style.trim} onChange={(colour) => style.trim = colour.hex}/>
                <ChromePicker color={style.fill} onChange={(colour) => style.fill = colour.hex}/>
                <ChromePicker color={style.base} onChange={(colour) => style.base = colour.hex}/>
            </StyledPicker>


            <Card ref={svg}/>

            <StyledButton onClick={() => download(svg)}>Download</StyledButton>
            <StyledButton onClick={() => save(state, style, type())}>Save</StyledButton>
        </StyledEditor>
    );
}

export default Editor;