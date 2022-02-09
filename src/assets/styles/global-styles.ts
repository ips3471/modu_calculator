import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
    ${normalize}

    html,
    body {
        overflow: hidden;
    }
    button {
        outline: none;
        border: none;
    }

    * {
        box-sizing: border-box;
    }
`

export default GlobalStyle
