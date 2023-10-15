import { Select } from 'antd'
import styled from 'styled-components'

export const HeadingWrapper = styled('div')`
  margin-top: 31px;
`
export const Heading = styled('span')`
  color: #232323;
  font-family: --var(font-inter);
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const FiltersWrapper = styled('div')`
  margin-top: 36px;
  margin-bottom: 33px;
  display: flex;
  align-items: center;
  color: #232323;
  font-family: --var(font-inter);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const SelectWrapper = styled('div')`
  margin-left: 16px;
`

export const StyledSelect = styled(Select)`
  border: none !important;
`
