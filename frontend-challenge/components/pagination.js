import { useState, useEffect } from "react";
import styles from "../styles/dashboard.module.css";
import { Pagination } from "antd";


const PaginationComponent = (props) => {

    const { totalCalls, handlePaginationChange } = props;

    const [skip, setSkip] = useState(1);

    useEffect(() => {
      handlePaginationChange(skip);
    }, [skip]);
    console.log()
    return(
        <>
    <div className={styles.paginationContainer}>
    {" "}
    <Pagination
      size="small"
      total={totalCalls}
      pageSize={10}
      onChange={(pageNumber) => {
        console.log("Page Number: ", pageNumber)
        setSkip((pageNumber - 1) * 10);
      }}
      showSizeChanger={false}
      defaultCurrent={1}
    />
  </div>
  <div className={styles.paginationToast}>
    {1 +
      skip +
      " - " +
      (skip + 10 < totalCalls ? skip + 10 : totalCalls) +
      " of " +
      totalCalls}{" "}
    results{" "}
  </div>
        </>
    )
}

export default PaginationComponent;