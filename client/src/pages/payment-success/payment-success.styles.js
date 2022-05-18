import styled from "styled-components";

export const PaymentSuccessContainer = styled.div`
  width: 80%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  button {
    margin-top: 20px;
    margin-left: auto;
  }
  @media screen and (max-width: 800px) {
    width: 90%;
    button {
      margin-top: 10px;
      min-width: unset;
      width: 40%;
    }
  }
`;

export const PaymentSuccessTitle = styled.h2`
  text-align: center;
`;
export const PaymentSuccessHeaderContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
  border-top: 1px solid darkgrey;
  margin-bottom: 10px;
  @media screen and (max-width: 800px) {
    margin-bottom: 0;
  }
`;

export const HeaderBlockContainer = styled.div`
  text-transform: capitalize;
  width: 15%;
  text-align: center;
  :first-child {
    text-align: start;
  }
  &:last-child {
    width: 4%;
  }
  @media screen and (max-width: 800px) {
    width: 22%;
    &:last-child {
    width: 9%;
  }
  }
`;

export const ShippingTitle = styled.h4`
  margin: 0 10px 0 0;
`;
export const ShippingDataContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const ShippingData = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
`;

export const TotalContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
  @media screen and (max-width: 800px){
    font-size: 30px;
  }
`;
