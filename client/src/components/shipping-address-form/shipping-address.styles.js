import styled from "styled-components";

export const ShippingContainer = styled.div`
  width: 100%;
  max-width: 700px;
  form button{
    margin-left: auto;
  }
`;

export const FormsInputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  div:first-child:nth-last-child(2),
  div:first-child:nth-last-child(2) ~ div {
    flex-grow: 0.40;
    margin: 0;
  }
  div:first-child:nth-last-child(3),
  div:first-child:nth-last-child(3) ~ div {
    flex-grow: 0.1;
    width: 25%;
    margin: 0;
  }
`;
