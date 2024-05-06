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

        ::-webkit-scrollbar {
            width: 4px;
        }

        ::-webkit-scrollbar-track {
            background: var(--light_gray);
        }

        ::-webkit-scrollbar-thumb {
            background: var(--black);
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--dark_gray);
        }
    }

    body {
        background: var(--black);
    }
`;
