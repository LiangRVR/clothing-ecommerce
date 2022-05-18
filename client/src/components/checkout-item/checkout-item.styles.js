import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  @media screen and (max-width: 800px){
    font-size: 16px;
  }
`;

export const ImageConatiner = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }

`;

export const TextContainer = styled.span`
  width: 23%;
  @media screen and (max-width: 800px){
    &:nth-child(4) {
      padding-left: 5px;
    }
  }
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;
  span {
    margin: 0 10px;
  }
  div {
    cursor: pointer;
  }
  @media screen and (max-width: 800px){
    padding-left: 5px;
  }
`;

export const RemoveButtonContainer = styled.div`
  padding-left: 12px;
  width: 8%;
  cursor: pointer;
  @media screen and (max-width: 800px){
    padding-left: unset;
  }
`;
