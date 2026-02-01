import { styled, css } from 'solid-styled-components';
import { Portal } from "solid-js/web";
import { createSignal, onMount, Show } from 'solid-js';
import copy from '../images/copy.webp';
import { saveStatic } from '../utilities/save';
import cross from '../images/cross.webp';


const StyledPopup = styled.div`
    position: absolute;
    width: ${props => props.width}px;
    height: 150px;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #444;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    z-index: 3;
`;

const StyledBackground = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 3;
`;

const StyledCode = styled.div`
    display: flex;
    gap: 0.75rem;
    margin: auto;
    justify-content: center;
    align-items: center;
`;

const StyledInput = styled.input`
    width: 3rem;
    height: 4rem;
    border: 0;
    outline: none;
    font-size: 3rem;
    text-align: center;
    border-radius: 5px;
    background: #333;
    color: #fff;
`;

const StyledCopy = css`
    width: 4rem;
    height: 4rem;

    cursor: pointer;
    &:hover {
        filter: brightness(90%);
    }
`;

const StyledReadOnly = css`
    margin-right: 1rem !important;
`;

const StyledHeader = styled.h3`
    margin: auto;
    margin-bottom: 0;
    color: #fff;
    font-size: 1.5rem;
`;

const StyledExit = styled.img`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
`;


const Share = ({ code }) => {
    const [message, setMessage] = createSignal(null);

    let share_code;
    let width = code ? 350 : 275;
    let header = code ? "Copy code" : "Enter code";

    onMount(() => {
        share_code = document.getElementById("share-code");
        if (code) {
            disableInput(true);
            share_code.appendChild(<img src={copy} class={StyledCopy} onclick={navigator.clipboard.writeText(copyCode())}/>);
            share_code.classList.add(StyledReadOnly);
            shareInput({"data": code, "target": share_code.firstChild});
        }

        share_code.firstChild.focus();
        document.addEventListener('keydown', keyPress);
    });

    function shareInput(event) {
        let sibling;
        console.log(event.inputType == "insertFromPaste");
        if (!event.data || !event.data.match(/^[0-9a-z]+$/)) {
            event.target.value = "";
            return
        }
        event.target.value = event.data;

        sibling = event.target.nextSibling;
        if (sibling && !sibling.disabled)
            sibling.focus();
        else
            downloadCard();
    }

    function inputFocus(event) {
        let target = event.target;
        if (target.value)
            target.select();
    }

    function keyPress(event) {
        let focusElement = document.activeElement;
        let key = event.key;

        if (key == "ArrowLeft" || key == "ArrowUp" || key == "Backspace")
            focusElement = focusElement.previousSibling;
        else if (key == "ArrowRight" || key == "ArrowDown" || key == "Delete")
            focusElement = focusElement.nextSibling;
        else
            focusElement = null;
        
        if(focusElement && !focusElement.disabled)
            setTimeout(() => focusElement.focus(), 1);
    }

    function copyCode() {
        let code = "";
        for (let i = 0; i < share_code.childElementCount - 1; i++)
            code += share_code.children[i].value
        return code;
    }

    function disableInput(value) {
        let inputs = share_code.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++)
            share_code.children[i].disabled = value;
    }

    function downloadCard() {
        disableInput(true);
        fetch("http://localhost:3000/character-card/store", {
            method: "GET",
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        });
    }

    function uploadCard() {
        fetch("localhost:3000/character-card/store", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(saveStatic(state, style, type))
        }).then(response => {
            console.log(response);
        });
    }

    function close() {
        let share = share_code.parentNode.parentNode;
        document.removeEventListener('keydown', keyPress);
        share.parentNode.removeChild(share);
    }

    return (
        <Portal>
            <StyledBackground/>
            <StyledPopup width={width}>
                <Show when={!message()} fallback={
                    <Show when={message() != 'loading'} fallback={''}>
                        <StyledText>{message()}</StyledText>
                        <StyledButton onclick={(e) => console.log(e)}>Ok</StyledButton>
                    </Show>
                }>
                    <StyledHeader>{header}</StyledHeader>
                    <StyledCode id="share-code">
                        <StyledInput name="code" type="text" oninput={shareInput} onfocus={inputFocus}/>
                        <StyledInput name="code" type="text" oninput={shareInput} onfocus={inputFocus}/>
                        <StyledInput name="code" type="text" oninput={shareInput} onfocus={inputFocus}/>
                        <StyledInput name="code" type="text" oninput={shareInput} onfocus={inputFocus}/>
                    </StyledCode>
                    <StyledExit src={cross} alt="cross" onclick={() => close()}/>
                </Show>
            </StyledPopup>
        </Portal>
    )
}

export default Share;