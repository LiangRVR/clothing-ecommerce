import styled from "styled-components";

export const SignInAndSignUpContainer = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  @media screen and (max-width: 800px) {
    width: 90%;
    flex-direction: column;
    align-content: center;
    div {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;
