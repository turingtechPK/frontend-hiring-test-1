/*
  Radio Buttons
*/

import React from 'react';

// Antd
import { Radio, Form } from 'antd';

function RadioButton({ 
  name, label, onChange, 
  disabled, required,
  options, notwrapInForm,
  tooltip
}) {

  // Rules
  let rules = [
    { required: required, message: 'REQUIRED' },
  ];

  // Input Text
  const Buttons = (
    <Radio.Group 
      name={ name }
      buttonStyle="solid"
      disabled={ disabled }
      onChange={ onChange }
      className="radio-group double"
    >
      {
        options?.map((opt, index) => {
          const { name, value } = opt || {};

          return(
            <Radio.Button 
              key={ index }
              value={ value }
            >
              { name }
            </Radio.Button>
          )
        })
      }
      
    </Radio.Group>
  );

  return(
    !!notwrapInForm?
      <>
        { Buttons }
      </>:
      <Form.Item
        name={ name }
        label={ label }
        rules={ rules }
        tooltip={tooltip}
      >
        { Buttons }
      </Form.Item>

  );
}

export default RadioButton;