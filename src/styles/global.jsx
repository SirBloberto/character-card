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
        overflow: hidden;
    }

    .character-card {
        filter: drop-shadow(0 0 3px #000);
    }

    .fullscreen-main {
        height: 100%;
        margin: 0;
        max-width: calc(100vh * (4/3));
        padding: 0;
    }

    .fullscreen-editor {
        height: 100vh;
        width: 100%;
        max-width: calc(100vh * (4/3));
    }
`;