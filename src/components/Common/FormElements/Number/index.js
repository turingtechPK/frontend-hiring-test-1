/*
  Input Number
*/

import React, {useState, useEffect} from 'react';

// Antd
import { Form, InputNumber } from 'antd';

// Style
import './style.scss';

function Number({
  name, label, placeholder,
  parser,
  defaultValue, precision,
  onChange, disabled, required,
  min, max, step, validateTrigger, validator,
  onblur, readOnly, notwrapInForm, formatter, tooltip, hidden, warning
}) {

  //let warningTimer;

  const [warningState, setWarningState] = useState(!!warning)

  useEffect(() => {
    setWarningState(warning)
  }, [warning]);

  // Rules
  let rules = [
    { required: required, message: 'REQUIRED' },
  ];

  if (!!validator) {
    rules.push({ validator: validator })
  }

  // Number Field
  const NumberField = (
    <InputNumber
      placeholder={placeholder || label}
      onChange={(e)=>{onChange && onChange(e); setWarningState(false)}}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      precision={precision}
      onBlur = {onblur}
      readOnly={ readOnly }
      formatter={formatter}
      parser={parser}
    />
  );

  return (
    !!notwrapInForm? 
      <>
        { NumberField }
      </>:
      <Form.Item
        name={name}
        label={label}
        validateTrigger={validateTrigger || 'onBlur'}
        rules={rules}
        tooltip={tooltip}
        hidden={hidden}
        className={warningState ? 'inputNumber ant-form-item-has-error' :''}
        //validateStatus={warning && 'error'}
      >
        { NumberField }
      </Form.Item>
  );
}

export default Number;