import styled from "styled-components";
import { Pagination } from "antd";
import { Select } from "antd";

export const CallListContainer = styled.div`
  height: 100vh;
  padding: 40px;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 2px solid #cbd6e2;
`;
export const TableHead = styled.thead`
  background-color: #f4f4f9;
  height: 50px;
  padding: 2px;
`;
export const TableRow = styled.tr`
  padding: 2px;
  width: 100%;
`;
export const TableBody = styled.tbody`
  padding: 8px;
`;
export const TableData = styled.td`
  padding: 8px;
  text-align: center;
  height: 60px;
  border-bottom: 1px solid #cbd6e2;
`;
export const AddNote = styled.button`
  width: 80px;
  height: 25px;
  color: white;
  border: none;
  outline: none;
  border-radius: 2px;
  background: #4f46f8;
  cursor: pointer;
`;
export const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 10px;
`;
export const FilterDiv = styled.div`
  display: flex;
`;
export const para = styled.p`
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
`;
export const CustomAntdSelect = styled(Select)`
  .ant-select-selection-item {
    color: #5b53f8 !important;
    font-size: 16px !important;
  }
`;
export const Custompagination = styled(Pagination)`
  .ant-pagination-options {
    display: none;
  }
`;
