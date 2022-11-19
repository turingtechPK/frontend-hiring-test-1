import { useEffect, useState } from "react";

import Pagination from "react-bootstrap/Pagination";

function CallDetailsPagination(props) {
  const [active, setActive] = useState("");

  const total_value = Math.ceil(props.total / props.limit_value);

  function setActiveTab(data) {
    setActive(data);
    props.getCallsData(data);
  }

  return (
    <div>
      <Pagination>
        <Pagination.Prev />
        {[...Array(total_value)].map((page, index) => {
          return (
            <Pagination.Item
              onClick={(e) => setActiveTab(index)}
              key={index}
              data-value={index}
              active={index === active}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}

        <Pagination.Next />
      </Pagination>
    </div>
  );
}

export default CallDetailsPagination;
