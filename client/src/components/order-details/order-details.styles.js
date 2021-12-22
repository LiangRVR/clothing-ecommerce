import styled from "styled-components";

export const OrderDetailContainer = styled.div`
    background-color: white;
`

export const OrderItemsContainer = styled.div`
  max-height: 500px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  div:hover{
      background-color: #F7F7F7;
  }
`;

export const OrderDetailTitle = styled.div`
    display: flex;
    align-content: center;
    p{  
        margin: auto 10px;
    }
`