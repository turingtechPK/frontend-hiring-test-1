import styled from 'styled-components'

export const ModalInfoGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-row-gap: 14px;
  margin-top: 32px;
  margin-bottom: 20px;
  & div {
    color: #232323;
    font-family: --var(font-inter);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
export const ModalHeader = styled('div')`
  color: #4f46f8;
  font-family: --var(font-inter);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 17.5px;
  border-bottom: 1px solid #d3d5d8;
`
