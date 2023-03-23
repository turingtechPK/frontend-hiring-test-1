import {
  getCallsInfo,
  getCallsInfoById,
  archiveCalls,
} from "../_redux/callActions";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";
import { capitalize } from "utils/capitalize";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import moment from "moment";

const PhoneListing = () => {
  const { nodes, totalCount, listLoading } = useSelector(
    (state) => state?.callInfoManagement,
    shallowEqual
  );
  const dispatch = useDispatch();
  const filterArr = ["All", "Archived", "UnArchived"];
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [isReload, setIsReload] = useState(false);

  const totalPages = Math.ceil(totalCount / limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(i);
  }
  useEffect(() => {
    dispatch(getCallsInfo(`?offset=${offset}&limit=${limit}`));
  }, [dispatch, limit, offset, isReload]);

  useEffect(() => {
    if (filter === "All") {
      setData(nodes);
    } else if (filter === "Archived") {
      const filteredData = nodes?.filter((data) => data?.is_archived);
      setData(filteredData);
    } else {
      const filteredData = nodes?.filter((data) => !data?.is_archived);
      setData(filteredData);
    }
  }, [filter, nodes]);

  return (
    <>
      {isOpen ? <Modal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      <div>
        <div className="p-5 mt-5">
          <h1 className="text-2xl mb-5">Turing Technologies Front End Test</h1>
          <div>
            <h3 className="mb-5 inline-block mr-3">Filter By:</h3>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex w-full justify-center text-md font-medium text-purple-600 hover:text-purple-900">
                {filter}
                <ChevronDownIcon
                  className="mt-1 h-5 w-5 text-purple-600 hover:text-purple-900"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute mt-2 w-[8rem] origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {filterArr?.map((data, index) => {
                      return (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-black text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              onClick={() => {
                                setFilter(data);
                              }}
                            >
                              {data}
                            </button>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <table className="table-auto w-full text-left border rounded-md  border-slate-200 overflow-hidden ">
            <thead className="bg-gray-200 overflow-hidden w-full border-b-2 border-gray-200">
              <tr>
                <th
                  scope="col"
                  className="   text-left   text-base  font-medium text-secondary"
                >
                  <span>CALL TYPE</span>
                </th>
                <th
                  scope="col"
                  className="   py-3  text-left   text-base  font-medium text-secondary"
                >
                  <span>DIRECTION</span>
                </th>

                <th
                  scope="col"
                  className="px-3 py-3 text-left  text-base  font-medium text-secondary"
                >
                  <span>DURATION</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  text-base  font-medium text-secondary"
                >
                  <span>FROM</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  text-base  font-medium text-secondary"
                >
                  <span>TO</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  text-base  font-medium text-secondary"
                >
                  <span>VIA</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  text-base  font-medium text-secondary"
                >
                  <span>CREATED AT</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  text-base  font-medium text-secondary"
                >
                  <span>STATUS</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left  text-base  font-medium text-secondary"
                >
                  <span>ACTIONS</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {listLoading ? (
                <Loader className="relative" />
              ) : (
                data?.map((data) => {
                  return (
                    <tr key={data?.id}>
                      <td className="whitespace-nowrap  py-4 text-md font-light text-secondary">
                        <p
                          className={`truncate w-34 font-light text-md ${
                            data?.call_type === "voicemail"
                              ? "text-blue-500"
                              : data?.call_type === "missed"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {capitalize(data?.call_type)}
                        </p>
                      </td>
                      <td className="whitespace-nowrap  py-4 text-md font-light text-secondary">
                        <p className="truncate w-34 font-light text-md text-blue-500">
                          {capitalize(data?.direction)}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-md font-light text-secondary">
                        <span className="inline-flex rounded-full font-light text-md px-2   leading-5 ">
                          {data?.duration}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-md font-light text-secondary">
                        <div className="font-light text-md">
                          {capitalize(data?.from)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap  pl-3 text-md font-light text-secondary text-left ">
                        <div className="font-light text-md">
                          {capitalize(data?.to)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap  pl-3 text-md font-light text-secondary text-left ">
                        <div className="font-light text-md">
                          {capitalize(data?.via)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap  pl-3 text-md font-light text-secondary text-left ">
                        <div className="font-light text-md">
                          {moment(data?.created_at).format("DD/MM/YYYY")}
                        </div>
                      </td>
                      <td className="whitespace-nowrap  pl-3 text-md font-light text-secondary text-left ">
                        <div
                          className={`inline-flex px-4 py-1 text-sm font-bold rounded-md cursor-pointer ${
                            data?.is_archived
                              ? " text-green-700  bg-green-200"
                              : "bg-gray-300 text-gray-500"
                          }`}
                          onClick={() => {
                            dispatch(
                              archiveCalls(
                                data?.id,
                                (res) => {
                                  setIsReload(!isReload);
                                  console.log(res);
                                },
                                (err) => console.log(err)
                              )
                            );
                          }}
                        >
                          {data?.is_archived ? "Archived" : "UnArchived"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap  pl-3 text-md font-light text-secondary text-left ">
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            dispatch(getCallsInfoById(data?.id));
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          ADD NOTE
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="12">
                  {paginationButtons?.map((data) => {
                    return (
                      <button
                        className={`relative inline-flex items-center rounded-md m-2  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-300 ${
                          currentPage === data ? "bg-purple-900 text-white" : ""
                        }`}
                        key={data}
                        onClick={() => {
                          handlePageChange(data);
                        }}
                      >
                        {data}
                      </button>
                    );
                  })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default PhoneListing;
