import { createGlobalStyles } from "solid-styled-components";

export default createGlobalStyles`
    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
    }

    #root {
        background-image: url(papyr.jpg);
    }
`;