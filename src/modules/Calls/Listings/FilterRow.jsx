import { Dropdown, Badge, Button } from 'react-bootstrap';

const archivedStatus = ['Archive', 'Non-archive'];
const callTypes = ['answered', 'voicemail', 'missed'];
const filterHash = {
  'answered': 'info',
  'voicemail': 'dark',
  'missed': 'secondary',
  'Archive': 'success',
  'Non-archive': 'danger'
};


const FilterRow = ({ values, setValues }) => {
  const areFiltersPresent = Object.keys(values.filters).length;
  const filters = Object.values(values.filters).map((value, index) => {
    return <Badge key={index} style={{ marginRight: 5 }} bg={filterHash[value]}>{value}</Badge>
  });
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', columnGap: 10 }}>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Archive Filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
              archivedStatus.map((status, index) => {
                return (
                  <Dropdown.Item key={index} onClick={() => setValues({ ...values, filters: { ...values.filters, archivedFilter: status } })}>{status}</Dropdown.Item>
                );
              })
            }
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Call Type Filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {
              callTypes.map((type, index) => {
                return (
                  <Dropdown.Item key={index} onClick={() => setValues({ ...values, filters: { ...values.filters, callType: type } })}>{type}</Dropdown.Item>
                );
              })
            }
          </Dropdown.Menu>
        </Dropdown>

        <Button variant='danger' onClick={() => setValues({ ...values, filters: {} })}>Remove Filters</Button>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', columnGap: 5 }}>
        Filters applied 
        {
          areFiltersPresent ?
          <div>{filters}</div>
            : <b>NONE</b>
         }
      </div>
    </div>
  )
};

export default FilterRow;