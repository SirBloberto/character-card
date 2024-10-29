import { useCard } from '../context/card';
import { createSignal, Show } from 'solid-js';
import clickOutside from '../helpers/click-outside';
import { styled, css } from 'solid-styled-components';
import { MOBILE_WIDTH, MOBILE_VERTICAL } from '../styles/variables';

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

const StyledButton = css`
    aspect-ratio: 21 / 9;
    border-radius: 8px;
    grid-row: 2;
    align-self: end;

    @media (max-width: ${MOBILE_WIDTH}px) {
        height: 50%;
        width: auto;
        border-radius: 20px;
    }

    @media (max-width: ${MOBILE_VERTICAL}px) {
        height: 65%;
        width: auto;
        border-radius: 20px;
    }
`;

const StyledBlockContainer = css`
    align-self: end;
    
    @media (max-width: ${MOBILE_WIDTH}px) {
        grid-column: 1 / 4 !important;
        width: 90%;
        margin: auto;
        margin-bottom: 0;
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

const StyledSelector = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    grid-row: 2;
    justify-content: end;
`;

const StyledSelected = styled.div`
    display: none;

    @media (max-width: ${MOBILE_WIDTH}px) {
        display: block;
        background-color: #000;
        height: 5px;
        width: 25%;
        align-self: center;
        border-radius: 5px;
    }
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

const Picker = ({ id, name }) => {
    const { style } = useCard();
    const [show, setShow] = createSignal(false);

    return (
        <>
            <Show when={show()}>
                <div use:clickOutside={() => setShow(false)} class={StyledBlockContainer} style={{"grid-column": id}}>
                    <StyledBlock>
                        <For each={colours}>{(colour) => 
                            <StyledSwatch colour={colour} onClick={() => style[name] = colour} width={100}/>
                        }</For>
                    </StyledBlock>
                </div>
            </Show>
            <StyledSelector style={{"grid-column": id}}>
                <Show when={show()}>
                    <StyledSelected/>
                </Show>
                <StyledSwatch width={20} colour={style[name]} onClick={() => setShow(true)} class={StyledButton}/>
            </StyledSelector>
        </>
    )
}

export default Picker;