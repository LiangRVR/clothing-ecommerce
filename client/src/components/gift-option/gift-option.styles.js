import styled, { css } from "styled-components";
import { ReactComponent as GiftIconSVG } from "../../assets/gift.svg";

const borderBottom = css`
  border-bottom: 1px solid #d0d0d0;
`;

export const GiftIcon = styled(GiftIconSVG)`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

export const GiftOptionContainer = styled.div`
  ${(props) => (props.checked ? null : borderBottom)};
  border-top: 1px solid #d0d0d0;
  margin: 45px 0;
  width: 100%;
  padding-top: 25px;
  padding-bottom: ${(props) => (props.checked ? `0` : `25px`)};
  display: flex;
  flex-direction: column;
  //justify-content: flex-start;
  align-items: center;
`;

export const GiftOptionTitle = styled.h3`
  font-weight: 700;
  line-height: 1.43;
  margin: 0;
`;

export const GiftOptionLabel = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 10px;
  margin-bottom: 10px;
  .checkbox {
    margin: 0 10px;
  }
  :hover ${GiftIcon}, :hover span {
    cursor: pointer;
    color: lightgrey;
  }
`;

export const GiftOptionMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: all 150ms;
`;
