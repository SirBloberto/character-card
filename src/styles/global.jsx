import { createGlobalStyles } from "solid-styled-components";

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
        background-image: url(papyr.webp);
    }
`;