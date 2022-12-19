import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Space, Typography } from "antd";
import cookie from "cookie"; //to get cookies on server side
import { getCookie, setCookie } from "cookies-next"; //to get cookies on client side
import router from "next/router";
import { useEffect, useState } from "react";
import DashBoard from "../../components/dashboard";
import CallModal from "../../components/modal";
import TopBanner from "../../components/top-banner";
import {
  addNote,
  archiveCall,
  getCalls,
  getRefreshToken,
} from "../../src/services/api-service";
import styles from "../../styles/callPage.module.css";

const REFRESH_TIMEOUT = 8 * 60 * 1000; //refreshing token every 9 minutes

const Calls = (props) => {
  const { data, error } = props;
  const { calls = [], count = 0, hasNext = false } = data;

  useEffect(() => {
    if (error || !getCookie("auth_token")) {
      setCookie("auth_token", "");
      router.push("/");
    }
    const fetchToken = async () => {
      const auth_token = getCookie("auth_token");
      if (auth_token) {
        console.log("Getting Refresh Token");
        const response = await getRefreshToken(auth_token);
        if (!response.error) {
          setCookie("auth_token", response.data.access_token);
        } else {
          setCookie("auth_token", "");
          router.push("/");
        }
      } else {
        setCookie("auth_token", "");
        router.push("/");
      }
    };
    const interval = setInterval(() => {
      fetchToken();
    }, REFRESH_TIMEOUT);

    return () => clearInterval(interval);
  }, []);

  const filterCalls = (calls, count, hasNext) => {
    if (filterBy !== "" && filterBy === "archived") {
      setFilteredCalls(calls.filter((call) => call.is_archived === true));
    } else if (filterBy !== "" && filterBy !== "archived") {
      setFilteredCalls(calls.filter((call) => call.is_archived === false));
    } else {
      setFilteredCalls(calls);
    }
    setTotalCalls(count);
    setHasNextPage(hasNext);
  };

  const menu = (
    <Menu
      selectable
      items={[
        {
          key: "",
          label: "All",
        },
        {
          key: "archived",
          label: "Archived",
        },
        {
          key: "unArchived",
          label: "Un Archived",
        },
      ]}
      onSelect={(data) => {
        setFilterBy(data.key);
      }}
    />
  );

  const [filterBy, setFilterBy] = useState("");
  const [note, setNote] = useState("");
  const [callsData, setCallsData] = useState(calls);
  const [totalCalls, setTotalCalls] = useState(count);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [selectedCall, setSelectedCall] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isOpenAddNotesModal, setIsOpenAddNotesModal] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [renderKey, setRenderKey] = useState("Render");

  useEffect(() => {
    if (filterBy !== "" && filterBy === "archived") {
      setFilteredCalls(callsData.filter((call) => call.is_archived === true));
    } else if (filterBy !== "" && filterBy !== "archived") {
      setFilteredCalls(callsData.filter((call) => call.is_archived === false));
    } else {
      setFilteredCalls(callsData);
    }
  }, [filterBy]);

  const handlePaginationChange = async (page) => {
    const auth_token = getCookie("auth_token");
    const response = await getCalls(page, 10, auth_token);

    if (response && response?.calls && response?.count && response?.hasNext) {
      filterCalls(response?.calls, response?.count, response?.hasNext);
    } else if (response.error) {
      setFetchError(true);
    }
  };

  const handleAddNote = (selectedID) => {
    setSelectedCall(filteredCalls.filter((call) => call.id === selectedID)[0]);

    setIsOpenAddNotesModal(true);
  };

  const updateCallsOnSuccess = (isNote, response) => {
    isNote
      ? message.success("Notes are successfully added")
      : message.success(`Call ${response.data.is_archived ? "Archived": "Unarchive" } Successfully`);
    const indexCalls = calls.findIndex((call) => call.id === response.data.id);
    const indexCallsFiltered = filteredCalls.findIndex(
      (call) => call.id === response.data.id
    );
    let newCalls = calls;
    let newFilteredCalls = filteredCalls;
    newCalls[indexCalls] = response.data;
    newFilteredCalls[indexCallsFiltered] = response.data;
    setCallsData(newCalls);
    setFilteredCalls(newFilteredCalls);
    setNote("");
    setRenderKey("Re"+renderKey)
  };

  const handlePostNote = async () => {
    const auth_token = getCookie("auth_token");
    const response = await addNote(
      selectedCall.id,
      { content: note },
      auth_token
    );

    if (!response.error) {
      updateCallsOnSuccess(true, response);
    } else {
      message.error("Something went wrong while adding the note");
    }
  };

  const handleArchiveCall = async (id) => {
    const auth_token = getCookie("auth_token");

    const response = await archiveCall(id, auth_token);
    if (!response.error) {
      updateCallsOnSuccess(false, response);
    } else {
      message.error("Something went wrong archiving the call");
    }
  };

  return (
    <>
      {error || fetchError ? (
        <>Error in Data Fetching</>
      ) : (
        <>
          <TopBanner />
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.header}>
                Turing Technologies Frontend Test
              </div>
            </div>
            <div className={styles.rowFlex}>
              <div className={styles.filterByText}>Filter By: </div>

              <Dropdown
                overlay={
                  <Menu
                    selectable
                    items={[
                      {
                        key: "",
                        label: "All",
                      },
                      {
                        key: "archived",
                        label: "Archived",
                      },
                      {
                        key: "unArchived",
                        label: "Un Archived",
                      },
                    ]}
                    onSelect={(data) => {
                      setFilterBy(data.key);
                    }}
                  />
                }
              >
                <Typography.Link>
                  <Space className={styles.filterByDropDown}>
                    Status
                    <DownOutlined />
                  </Space>
                </Typography.Link>
              </Dropdown>
            </div>

            <div className={styles.row}>
              <DashBoard
                key={renderKey}
                calls={filteredCalls}
                totalCalls={totalCalls}
                hasNextPage={hasNextPage}
                handlePaginationChange={handlePaginationChange}
                handleAddNote={handleAddNote}
                handleArchiveCall={handleArchiveCall}
              />
            </div>
            <CallModal
              selectedCall={selectedCall}
              isOpenAddNotesModal={isOpenAddNotesModal}
              setIsOpenAddNotesModal={setIsOpenAddNotesModal}
              handlePostNote={handlePostNote}
              note={note}
              setNote={setNote}
            />
          </div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const { headers } = req;
  const cookieData = cookie.parse(headers.cookie);
  if (cookieData?.auth_token) {
    const response = await getCalls(null, null, cookieData.auth_token);
    return {
      props: {
        data: response,
        error: false,
      },
    };
  }
  return {
    props: {
      data: {},
      error: true,
    },
  };
}

export default Calls;
