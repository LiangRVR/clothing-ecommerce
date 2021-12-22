import styled from "styled-components";

export const SummaryContainer = styled.div`
  width: 100%;
  max-width: 300px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
  background-color: white;
`;

export const SummaryData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid lightgray;
`;
export const SummaryDataElement = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;
export const Total = styled.h4`
  margin: 0;
`;
export const FormPromo = styled.form`
  margin: 30px 0 20px 0;
  height: 45px;
  display: flex;
  align-content: flex-end;
  justify-content: space-between;
  button {
    flex-grow: 0.2;
    min-width: 40px;
    height: 35px;
    line-height: 35px;
    padding: 0 20px;
    margin-top: auto;
    border: 1px solid black;
  }
  div {
    flex-grow: 0.6;
    margin-top: auto;
    margin-bottom: 0;
    padding: 0;
    width: 70px;
  }
`;
