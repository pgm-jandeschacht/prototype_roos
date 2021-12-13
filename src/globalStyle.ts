import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
        scroll-behavior: smooth;
    }
    
    /* #root {
        margin: 0 auto;
    } */

    body {
        color: #001429;
    }

    a {
        text-decoration: none;
        color: currentColor;
    }

    li {
        list-style: none;
    }

    img {
        width: 100%;
    }

    button {
        cursor: pointer;
        border: none;
    }
`

export default GlobalStyle;