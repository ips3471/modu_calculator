import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }
    body {
        overflow: hidden;
        font-size: 1.1rem;
        margin: 0;
    }
    h1 {
        padding: 0.8em;
        margin: 0;
    }
    button {
        outline: none;
        border: none;
    }
    ul {
        list-style: none;
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
