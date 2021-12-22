import styled from "styled-components";

export const PaymentSuccessItemContainer = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  
`;

export const ItemImageContainer = styled.div`
  width: 15%;
  padding-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const TextContainer = styled.span`
  width: 15%;
  text-align: center;
  &:last-child {
    width: 4%;
  }
`;
