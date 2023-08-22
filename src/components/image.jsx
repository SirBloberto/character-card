import { styled } from 'solid-styled-components';
import { createSignal, onMount, Show } from 'solid-js';
import cross from '/cross.png';
import plus from '/plus.png';
import { useCard } from '../context/card';

const StyledImage = styled.image`
    height: height;
`;

const StyledNew = styled.img`
    width: 20px;
    height: 20px;
    display: flex;
    margin: auto;
    margin-top: 75%;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const StyledDelete = styled.img`
    width: 15px;
    height: 15px;
    display: flex;
    margin: auto;
    margin-top: 10%;
    margin-right: 10%;

    &:hover {
        cursor: pointer;
    }
`;

const Image = ({ name, x, y, width, height }) => {
    const { state } = useCard();
    const [hover, setHover] = createSignal(false);

    onMount(() => {
        if (!state[name])
            state[name] = null;
    });

    function uploadImage() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image';
        input.onchange = (event) => { 
            var reader = new FileReader();
            if (event.target.files[0])
                reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = () => state[name] = reader.result;
        }
        input.click();
    }

    function deleteImage() {
        state[name] = null;
    }

    return (
        <svg x={x} y={y} width={width} height={height} on:mouseenter={() => setHover(true)} on:mouseleave={() => setHover(false)}>
            <StyledImage href={state[name]} height={height}/>
            <foreignObject x={0} y={0} width={width} height={height}>
                <Show when={!state[name]}>
                    <StyledNew src={plus} onClick={() => uploadImage()}/>
                </Show>
                <Show when={state[name] && hover()}>
                    <StyledDelete src={cross} onClick={() => deleteImage()}/>
                </Show>
            </foreignObject>
        </svg>
    )
}

export default Image;