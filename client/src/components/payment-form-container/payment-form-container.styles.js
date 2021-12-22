import styled from "styled-components";

export const ElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  max-width: 700px;
`;

export const BillingTitle = styled.h4`
  margin: 0 10px 0 0;
`;
export const BillingDataContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

export const BillingData = styled.div`
  display: flex;
  flex-direction: column;
  p{
    margin: 0;
  }
`