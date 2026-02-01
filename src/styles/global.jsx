import { createGlobalStyles } from "solid-styled-components";
import papyr from '../images/papyr.webp';

export default createGlobalStyles`
    * {
        margin: 0;
        padding: 0;
        user-select: none;
    }

    html, body {
        height: 100%;
    }

    #root {
        height: 100%;
        background-image: url(${papyr});
        overflow-x: hidden;
    }

    .character-card {
        filter: drop-shadow(0 0 3px #000);
    }

    .fullscreen-main {
        height: 100%;
        margin: 0;
        max-width: calc(100vh * (4/3)) !important;
        padding: 0 !important;
    }

    .fullscreen-editor {
        height: 100vh;
        width: 100% !important;
        max-width: calc(100vh * (4/3)) !important;
    }

    .button {
        border-radius: 20px;
        margin: auto;
        border: solid 1px #da7c0c;
        background: linear-gradient(180deg, #faa51a, #f47a20);
        box-shadow: 0px 2px 5px #cc7000;
    
        &:hover {
            cursor: pointer;
            background: linear-gradient(180deg, #f88e11, #f06015);
        }
    }

    input[type="range"] {
        outline: 0;
        border: 0;
        border-radius: 500px;
        cursor: pointer;
        height: 100%;
        width: 100%;

        & {
            overflow: hidden;
            -webkit-appearance: none;
            background-color: #bbb;
        }

        &::-webkit-slider-runnable-track {

        }

        &::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
            -webkit-appearance: none;
            background: #1597ff;
            border-radius: 50%;
            position: relative;
        }

        &:active::-webkit-slider-thumb {
            background: #0587ef;
        }
    }
`;