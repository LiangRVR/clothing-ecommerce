import styled from "styled-components";

export const BillingContainer = styled.div`
  width: 100%;
  max-width: 700px;
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

  :last-child{
    margin-top: 20px;
  }
`;

export const OptionLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  span{
    margin-left: 10px;
  }
  :hover span {
    cursor: pointer;
    color: lightgrey;
  }
`;