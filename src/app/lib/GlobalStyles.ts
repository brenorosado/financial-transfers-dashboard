import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        font-family: 'Inter', sans-serif;
        --red: #F46767;
        --yellow: #F8C765;
        --green: #99FF99;
        --blue: #98C7F4;
        --light_gray: #838383;
        --gray: #1E1E1E;
        --dark_gray: #181818;
        --black: #141414;
        --white: #ffffff;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: var(--white);
    }

    body, main {
        min-width: 100dvh;
        min-width: 100vw;
        min-height: 100dvh;
        min-height: 100vh;
        overflow-x: hidden;
        background: var(--black);
    }
    
`;
