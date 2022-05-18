import styled from "styled-components";

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

export const FormAndSummaryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 800px){
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const FormContainer = styled.div`
  flex-grow: 0.6;
  max-width: 65%;
  @media screen and (max-width: 800px){
    width: 80%;
    max-width: unset;
  }
`;

export const SummaryAndCartDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0.4;
  max-width: 30%;
  @media screen and (max-width: 800px){
    width: 80%;
    max-width: unset;
  }
`;
