import { styled } from "styled-components";

export const CallModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: scroll;
  max-height: 800px;
  text-transform: capitalize;
  .purple-text {
    color: #4f46f8;
    font-weight: bold;
  }
  .header {
    display: flex;
    justify-content: space-between;
    .title-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      .title {
        font-size: large;
      }
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .text-area {
      height: 4rem;
    }
    .row {
      display: flex;
      gap: 1rem;
      .title {
        width: 6rem;
        font-weight: 900;
      }
      .value {
      }
    }
  }
  .note-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .footer {
  }
`;
export const Line = styled.hr`
  color: #d3d5d8;
  width: 100%;
  margin: 0;
`;
