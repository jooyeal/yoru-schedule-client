import { css } from "styled-components";

export const mobile = (define) => css`
  @media (max-width: 768px) {
    ${define}
  }
`;
