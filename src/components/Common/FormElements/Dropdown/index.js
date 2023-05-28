/*
  Dropdown
*/

import React from 'react';

// Antd
import { Select, Form } from 'antd';

// Style
import './style.scss';

const { Option } = Select;

function Dropdown({ 
  name, label, showSearch, placeholder, 
  options, onChange, defaultValue, 
  allowClear, disabled, required,
  loading, onKeyUp, onKeyDown, 
  validator, validateTrigger, notwrapInForm, tooltip
}) {

  // const sortBy = [{ prop:'text', direction: 1 }];
  // const sortedOption = sortArray(options, sortBy);
  const sortedOption = options;

  // Validations rules
  let  rules = [{ required: required, message: 'REQUIRED' }];
  if(!!validator){
    rules.push({ validator: validator });
  }
  
  const DropdownList = (
    <Select 
      getPopupContainer={trigger => trigger.parentNode}
      showSearch={ showSearch === false? false: true }
      allowClear={ allowClear === false? false: true }
      defaultValue={ defaultValue }
      placeholder={ placeholder || 'PLEASE SELECT' } 
      onChange={ onChange }
      onKeyUp={ onKeyUp }
      onKeyDown={ onKeyDown }
      disabled={ disabled }
      loading={ loading }
      optionFilterProp="title"
      suffixIcon={<i className="icon-down"></i>}
      showArrow={ !disabled }
      // notFoundContent={< NoContent loading={ loading } />}
    >
      {
        sortedOption && sortedOption.map((data, index) => {
          return(
            <Option 
              key={ index } 
              title={ data.name }
              value={ data.value }>
              { data.name }
            </Option>
          )
        })
      }
    </Select>
  );

  return(
    !!notwrapInForm?
      <>
        { DropdownList }
      </>:
      <Form.Item
        name={ name }
        label={ label }
        validateTrigger={ validateTrigger || 'onBlur' }
        rules={ rules }
        tooltip={tooltip}
      >
        { DropdownList }
      </Form.Item>
  );
}

export default Dropdown;