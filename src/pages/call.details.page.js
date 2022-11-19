import CallDetailsPagination from "../components/navigation/pagination.js";
import CallTable from "../components/calls.table.js";
import SortByFilter from "../components/sort.by.filter.js";
import { useEffect, useState } from "react";
import AjaxCall from "../services/ajax";

const CallDetails = () => {
  const [limit_value, setLimitValue] = useState(10);
  const [filter, setFilter] = useState(0);
  const [call_data, setCallsData] = useState([]);
  const [total, setTotal] = useState(0);
  const [next_page, setNextPage] = useState(true);

  useEffect(() => {
    getCallsData(0, limit_value);
  }, []);

  setInterval(() => {
    AjaxCall("POST", "auth/refresh-token", {}, false, true)
      .then(function (response) {
        localStorage.setItem(
          "SavedToken",
          "Bearer " + response.access_token,
          "RefreshToken",
          response.refresh_token
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  }, 600000);
  async function getCallsData(offset_value) {
    console.log("this is data", offset_value);

    AjaxCall(
      "GET",
      `calls?offset=${offset_value * limit_value}&limit=${limit_value}`,
      {},
      false,
      true
    )
      .then(function (response) {
        console.log("this is response", response);
        setCallsData(response.nodes);
        setTotal(response.totalCount);
        setNextPage(response.hasNextPage);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  return (
    <div className="call-details-page ">
      <h3>Turing Technologies frontend test</h3>
      <SortByFilter setFilter={setFilter} filter={filter} />
      <CallTable
        data={call_data}
        total={total}
        next_page={next_page}
        filter={filter}
        getCallsData={getCallsData}
      />
      <div className="pagination-details-page">
        <CallDetailsPagination
          total={total}
          limit_value={limit_value}
          getCallsData={getCallsData}
        />
      </div>
    </div>
  );
};

export default CallDetails;
