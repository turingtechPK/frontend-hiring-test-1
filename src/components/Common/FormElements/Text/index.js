/*
  Input Text
*/

import React from 'react';

// Antd
import { Input, Form } from 'antd';

import { SPACE_VALIDATIOR } from '../../../../constants/General';

// Style
import './style.scss';

function Text({ 
  name, label, placeholder, 
  readOnly, defaultValue, 
  onChange, disabled, required,
  onBlur, validator, validateTrigger,
  maxLength, notwrapInForm
}) {

  // Rules
  let rules = [
    { required: required, message: 'REQUIRED' },
    {
      pattern: SPACE_VALIDATIOR,
      message: 'Spaces at start not allowed',
    }
  ];

  // Custom Validations
  !!validator && rules.push( {validator} );

  // Input Text
  const InputText = (
    <Input 
      placeholder={ placeholder || label } 
      onChange={ onChange || null } 
      defaultValue={ defaultValue }
      disabled={ disabled }
      onBlur={ onBlur }
      maxLength={ maxLength }
      readOnly={ readOnly }
    />
  );

  return(
    !!notwrapInForm?
      <>
        { InputText }
      </>:
      <Form.Item
        name={ name }
        label={ label }
        validateTrigger={ validateTrigger || 'onBlur' }
        rules={ rules }
      >
        { InputText }
      </Form.Item>

  );
}

export default Text;