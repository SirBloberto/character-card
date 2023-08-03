import { styled } from 'solid-styled-components';
import Basic from '../cards/basic';
import download from '../utilities/download';
import save from '../utilities/save';
import upload from '../utilities/upload';
import { useCard } from '../context/card';
import { useSaved } from '../context/saved';

const StyledButton = styled.button`
    padding: 1rem;
    border-radius: 50px;
    width: 200px;
`;


const Editor = () => {
    const { state, style, setId, type } = useCard();
    const { setSaved } = useSaved();

    return (
        <>
            <Basic/>

            <StyledButton onClick={download(state, style, type, setId )}>Download</StyledButton>
            <StyledButton onClick={event => save(event, state, style, type, setId, setSaved )}>Save</StyledButton>
            <StyledButton onClick={upload}>Upload</StyledButton>
        </>
    );
}

export default Editor;