/*
  Multi Select Dropdown
*/

import React from 'react';

// Antd
import { Select, Form } from 'antd';


const { Option } = Select;

function MultiSelect({ 
  name, label, showSearch, placeholder, 
  options, onChange, defaultValue, 
  allowClear, disabled, required,
  loading, onKeyUp, onKeyDown, 
  validator, validateTrigger, notwrapInForm
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
      mode="multiple"
      showArrow = { true }
      showSearch = { true }
      suffixIcon = { <i className="icon-down"></i> }
      allowClear={ allowClear }
      defaultValue={ defaultValue }
      placeholder={ placeholder || 'PLEASE SELECT' } 
      onChange={ onChange }
      onKeyUp={ onKeyUp }
      onKeyDown={ onKeyDown }
      disabled={ disabled }
      loading={ loading }
      optionFilterProp="title"
      maxTagCount="responsive"
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
      >
        { DropdownList }
      </Form.Item>
  );
}

export default MultiSelect;