import styled from "styled-components";

export const DateRangeInputContainer = styled.div`
  border: 1px solid gray;
  border-radius: clamp(8px, 0.42vw, 0.42vw);
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  flex: 1;

  span {
    font-size: clamp(12px, 0.833vw, 0.833vw);
    color: var(--light_gray);
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  input {
    all: unset;
    width: 100%;
    padding: clamp(3px, 0.35vw, 0.35vw);
    border-radius: clamp(8px, 0.42vw, 0.42vw);
    font-size: clamp(12px, 0.833vw, 0.833vw);
    color-scheme: light;
  }
`;
