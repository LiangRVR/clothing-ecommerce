import styled from "styled-components";

export const BillingContainer = styled.div`
  width: 100%;
  max-width: 700px;
`;

export const FormsInputRow = styled.div`
  width: 100%;
  :last-child {
    margin-top: 20px;
  }
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
  @media screen and (max-width: 800px){
    &:last-child{
      display: flex;
      justify-content: space-between;
      & button{
        min-width: unset;
        width: 40%;
      }
    }
  }

`;

export const OptionLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  span {
    margin-left: 10px;
  }
  :hover span {
    cursor: pointer;
    color: lightgrey;
  }
`;
