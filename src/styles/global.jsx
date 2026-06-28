import { createGlobalStyles } from "solid-styled-components";

export default createGlobalStyles`
    * {
        margin: 0;
        padding: 0;
        user-select: none;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    html, body {
        height: 100%;
    }

    #root {
        height: 100%;
        background: #22222a;
        overflow: hidden;
    }

    .character-card {
        filter: drop-shadow(0 20px 56px rgba(0,0,0,0.85)) drop-shadow(0 6px 18px rgba(0,0,0,0.55));
    }

    .fullscreen-editor {
        width: 100% !important;
        max-width: var(--fs-width, 100vw) !important;
    }

    .fullscreen-editor * {
        pointer-events: none !important;
        cursor: default !important;
    }

    .button {
        background: #E8932A;
        border: none;
        border-radius: 8px;
        color: #0a0a0a;
        font-weight: 600;
        font-size: 0.875rem;
        letter-spacing: 0.02em;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        transition: background 0.15s ease, box-shadow 0.15s ease;

        &:hover {
            cursor: pointer;
            background: #d4821e;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }

        &:active {
            background: #c07518;
        }
    }

    input[type="range"] {
        outline: 0;
        border: 0;
        border-radius: 500px;
        cursor: pointer;
        height: 6px;
        width: 100%;
        overflow: hidden;
        -webkit-appearance: none;
        background-color: rgba(255,255,255,0.12);

        &::-webkit-slider-thumb {
            width: 14px;
            height: 14px;
            -webkit-appearance: none;
            background: #E8932A;
            border-radius: 50%;
            position: relative;
            box-shadow: -100vw 0 0 100vw rgba(232,147,42,0.18);
        }

        &:active::-webkit-slider-thumb {
            background: #d4821e;
        }
    }
`;
