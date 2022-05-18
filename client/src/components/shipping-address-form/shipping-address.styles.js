import styled from "styled-components";

export const ShippingContainer = styled.div`
  width: 100%;
  max-width: 700px;
  form button {
    margin-left: auto;
  }
  @media screen and (max-width: 800px) {
    form button {
      min-width: unset;
      width: 40%;
    }
  }
`;

export const FormsInputRow = styled.div`
  width: 100%;

  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div:first-child:nth-last-child(2),
    div:first-child:nth-last-child(2) ~ div {
      flex-grow: 0.4;
      margin: 0;
    }
    div:first-child:nth-last-child(3),
    div:first-child:nth-last-child(3) ~ div {
      flex-grow: 0.1;
      width: 25%;
      margin: 0;
    }
  }
`;
