import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        height: 100vh;
    }
    body {
        overflow: hidden;
        margin: 0;
        padding: 0;
        background-color: #000000;
        height: 100%;
    }
    #root {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        font-size: 1.1rem;

    }
    h1 {
        padding: 0;
        margin: 0;
    }
    button {
        outline: none;
        border: none;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
