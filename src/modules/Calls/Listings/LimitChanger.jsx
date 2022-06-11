import { Dropdown } from 'react-bootstrap';

const limits = [10, 20, 30];

const LimitChanger = ({ setValues, values }) => {
  const { limit: currentLimit } = values;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {currentLimit} Items per page
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          limits.map((limit, index) => {
            const isDisabled = currentLimit === limit || false;
            return (
              <Dropdown.Item disabled={isDisabled} key={index} onClick={() => setValues({ ...values, limit, offset: 0 })}>{limit} Items per page</Dropdown.Item>
            );
          })
        }
      </Dropdown.Menu>
    </Dropdown>
  )
};

export default LimitChanger;