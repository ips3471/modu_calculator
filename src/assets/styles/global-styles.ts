import { normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${normalize}

    * {
    box-sizing: border-box;
}
h1, h2, ul, button {
    padding: 0;
    margin: 0;
}
button {
    outline: none;
    border: none;
}
ul {
    list-style: none;
}
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
    width: 100%;
    height: 100%;
    font-size: 1.1rem;
}
div#root {
    height:100%;
}
`;

export default GlobalStyle;
