import styled, { css } from "styled-components";
import { PaymentElement } from "@stripe/react-stripe-js";

const largeSpinner = css`
  width: 60px;
  height: 60px;
`;
const smallSpinner = css`
  width: 25px;
  height: 25px;
`;

export const FormContainer = styled.form`
  width: 100%;
  min-width: 500px;
  align-self: center;
  button:disabled div {
    border: 3px solid black;
    border-top-color: white;
  }
  button:hover div {
    border: 3px solid black;
    border-top-color: lightgray;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    @media screen and (max-width: 800px) {
        min-width: unset;
        width: 45%;
    }
  }
  @media screen and (max-width: 800px) {
    min-width: unset;
    width: 100%
  }
`;

export const PaymentElementContainer = styled(PaymentElement)`
  margin-bottom: 24px;
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  padding: 0 40%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  display: inline-block;
  ${({ isLarge }) => (isLarge ? largeSpinner : smallSpinner)}
  border: 3px solid white;
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const PaymentMessage = styled.div`
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
`;
