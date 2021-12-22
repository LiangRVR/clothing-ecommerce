import styled from "styled-components";

const stageInActive = "lightgray";
const stageActive = "black";
const diameter = 12;

const setColor = ({ active }) => (active ? stageActive : stageInActive);

export const ProgressIndicatorContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 0 auto;
`;

export const StepContainer = styled.div`
  width: 23%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export const IndicatorSign = styled.div`
  background-color: ${setColor};
  border-radius: 50%;
  height: ${diameter}px;
  width: ${diameter}px;
`;

export const IndicatorText = styled.p`
  margin: 5px auto;
  color: ${setColor};
  text-align: center;
`;

export const DividerLine = styled.div`
  height: 1px;
  background-color: ${setColor};
  position: absolute;
  top: ${diameter / 2}px;
  left: calc(50% + ${(3 / 2) * diameter}px);
  width: calc(144.9% - ${(3) * diameter}px);
`;
