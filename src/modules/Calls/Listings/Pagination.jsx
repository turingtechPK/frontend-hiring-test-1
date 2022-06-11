import { Button } from 'react-bootstrap';

const ItemsPagination = ({ values, setValues, hasNextPage }) => {
  const { offset } = values;
  const isPrevBtnDisabled = offset <= 0 || false;
  const isNextBtnDisabled = !hasNextPage;

  return (
    <div style={{ display: 'flex', columnGap: 10 }}>
      <Button 
        disabled={isPrevBtnDisabled}
        onClick={() => {
          setValues({ ...values, offset: offset - 1 })
        }} 
        variant="outline-primary">
          Previous
      </Button>
      <Button>{offset}</Button>
      <Button
        disabled={isNextBtnDisabled} 
        onClick={() => setValues({ ...values, offset: offset + 1 })}
        variant="outline-primary">
         Next
      </Button>
    </div>
  )
};

export default ItemsPagination;