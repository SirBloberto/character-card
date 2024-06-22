import { useCard } from '../context/card';
import { createSignal, Show, createEffect } from 'solid-js';
import clickOutside from '../helpers/click-outside';
import { styled } from 'solid-styled-components';

const StyledPicker = styled.div`
    display: flex;
    flex-direction: column;
    height: 15vh;
    justify-content: end;
    gap: 5px;
`;

const StyledSwatch = styled.button`
    width: ${props => props.width}%;
    aspect-ratio: 1;
    border-radius: 20%;
    border: 1px solid #000;
    background: ${props => props.colour};
    margin-left: auto;
    margin-right: auto;
    display: flex;

    &:hover {
        cursor: pointer;
    }
`;

const StyledBlock = styled.div`
    background: #fff;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1px;
    padding: 1px;
    border-radius: 5px;
    border: solid 1px #000;
`;

const colours = [
    '#4D4D4D','#999999','#FFFFFF',
    '#F44E3B','#FE9200','#FCDC00',
    '#DBDF00','#A4DD00','#68CCCA',
    '#73D8FF','#AEA1FF','#FDA1FF',
    '#333333','#808080','#cccccc',
    '#D33115','#E27300','#FCC400',
    '#B0BC00','#68BC00','#16A5A5',
    '#009CE0','#7B64FF','#FA28FF',
    '#000000','#666666','#B3B3B3',
    '#9F0500','#C45100','#FB9E00',
    '#808900','#194D33','#0C797D',
    '#0062B1','#653294','#AB149E',
]

const Picker = ({ name }) => {
    const { style } = useCard();
    const [show, setShow] = createSignal(false);

    return (
        <StyledPicker>
            <Show when={show()}>
                <div use:clickOutside={() => setShow(false)}>
                    <StyledBlock>
                        <For each={colours}>{(colour) => 
                            <StyledSwatch colour={colour} onClick={() => style[name] = colour} width={100}/>
                        }</For>
                    </StyledBlock>
                </div>
            </Show>
            <StyledSwatch width={20} colour={style[name]} onClick={() => setShow(true)} style={{"aspect-ratio": "21 / 9", "border-radius": "8px"}}/>
        </StyledPicker>
    )
}

export default Picker;