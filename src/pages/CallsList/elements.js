import { styled } from "styled-components";
export const CallsListPageWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .heading {
    font-size: 2rem;
    font-weight: 300;
  }
`;

export const TableCompWrapper = styled.div`
  :where(.css-dev-only-do-not-override-dkbvqv).ant-table-wrapper
    .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th {
    border-inline-end: none;
  }
`;
