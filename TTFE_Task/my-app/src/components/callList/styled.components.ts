import { Button } from "antd";
import styled from "styled-components";

import { createGlobalStyle } from "styled-components";

export const MainContainer = styled.div``;

export const HeaderContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d3d5d8;
  .ant-btn.css-dev-only-do-not-override-26rdvq.ant-btn-default {
    background-color: #4f46f8;
    border-radius: 3px;
    color: #fff;
  }
`;

export const Heading = styled.h1`
  font-size: 28px;
  color: #232323;
  font-family: Avenir, Medium;
  padding-left: 60px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding-left: 60px;
  .ant-select-selector {
    border: none !important;
    padding: 0px 12px !important;
  }
  .ant-select-selector span:nth-child(2) {
    color: #4f46f8;
  }
  .ant-select-arrow {
    left: 100px;
  }

  .ant-select-item-option-active {
    color: #4f46f8 !important;
    background-color: #4e45f638 !important;
  }
`;

export const GlobalStyle = createGlobalStyle<{}>`
.ant-select-item-option-active {
  color: #4f46f8 !important;
  background-color: #4e45f638 !important;
}
.ant-select.css-dev-only-do-not-override-26rdvq.ant-select-single.ant-select-show-arrow.ant-select-showopen.ant-select-open{
  border:none !important;
}

  .ant-select-dropdown-placement-bottomLeft{
    min-width:201px !important;
    border-radius:0px;
  }
  .ant-modal-content .ant-modal-footer .ant-btn-default {
    display: none !important;
   
  }
  .ant-modal-content .ant-modal-footer button:nth-child(2) {
    width: 100% !important;
    border-radius: 2px;
    margin-left: 0px;
  }
  .ant-modal-close{
    color: #4F46F8;

  }

`;

export const Title = styled.h4`
  color: #232323;
  font-size: 14px;
  line-height: 19px;
  font-family: Avenir, Book;
`;

export const TableContainer = styled.div`
  padding: 60px;
  .ant-pagination.ant-table-pagination.ant-table-pagination-right.css-dev-only-do-not-override-26rdvq {
    justify-content: center;
  }
  .ant-table-content .ant-table-thead {
    border: 1px solid red !important;
  }
`;

export const CustomButton = styled(Button)<{
  value: any;
}>`
  background-color: ${(props) =>
    props.value === "true" ? "#EDFBF9" : "#D3D5D8"};
  color: ${(props) =>
    props.value === "true" ? "#1DC9B7" : "#727272"} !important;
  border-radius: 3px;
  width: 100px;
`;

export const NotesButton = styled(Button)`
  background: #4f46f8;
  color: #fff !important;
`;

export const LogOutButton = styled(Button)`
  width: 108px;
  height: 40px;
  border-radius: 3px;
`;

export const DirectionText = styled.h3<{ value: string }>`
  color: ${(props) =>
    props.value === "missed"
      ? "#C91D3E"
      : props.value === "voicemail"
      ? "#325AE7"
      : props.value === "answered"
      ? "#1DC9B7"
      : "#325AE7"};

  font-size: 12px;
  font-family: Avenir, Medium;
`;

export const Text = styled.h3`
  font-size: 14px;
  color: #232323;
  font-family: Avenir, Medium;
  font-weight: 400;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px 0px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Name = styled.div`
  color: #232323;
  font-size: 14px;
  font-family: Avenir, Heavy;
  font-weight: 700;
`;
export const Value = styled.div`
  color: #232323;
  font-size: 14px;
  font-family: Avenir, Heavy;
`;

export const CallType = styled.div`
  color: #325ae7;
  font-size: 14px;
  font-family: Avenir, Medium;
`;

export const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const TextTitle = styled.div``;

export const ModalContainer = styled.div``;

export const HorizontalLine = styled.hr`
  border: 1px solid #d3d5d8;
  // width: 100%;
`;

export const SpinContainer = styled.div`
  text-align: center;
`;
