import styled from "styled-components";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  min-height: 140px;
  max-height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

export const CartItemsContainer = styled.div`
  max-height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 25px auto;
`;

export const TotalAmount = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  span{
      font-size: 20px;
    }
`;


