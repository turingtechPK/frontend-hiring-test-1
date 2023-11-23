"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CustomChip,
  TableHeader,
  CustomTable,
  WarningPrompt,
} from "@components";
import { Box } from "@mui/material";
import { AddNote } from "./add-note";
import {
  useGetAllCallsQuery,
  useUpdateStatusMutation,
} from "@services/calls-api";
import type { ITableHeaderData } from "@type/table-header";
import { getCallTypeColor, getFormattedDuration, getVariant } from "@utils";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const tableHeaderData: ITableHeaderData[] = [
  {
    type: "select",
    FieldProps: {
      name: "status",
      label: "Status",
    },
    options: [
      { label: "All", value: "all" },
      { label: "Archived", value: "archived" },
      { label: "UnArchived", value: "unArchived" },
    ],
  },
  {
    type: "select",
    FieldProps: {
      name: "callType",
      label: "Call Type",
    },
    options: [
      { label: "Missed", value: "missed" },
      { label: "Answered", value: "answered" },
      { label: "VoiceMail", value: "voiceMail" },
    ],
  },
];

export function CallsTable(): JSX.Element {
  const [params, setParams] = useState<any>({
    limit: 10,
    page: 1,
    offset: 0,
  });
  const [otherParams, setOtherParams] = useState<any>();
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});
  const [mutation, { isLoading: updateStatusLoading }] =
    useUpdateStatusMutation();

  //API CALL FOR CHANGE STATUS
  async function handleChangeStatus(): Promise<any> {
    try {
      const { message } = await mutation({
        params: {
          callId: rowData.id,
          status: rowData.is_archived ? "unarchived" : "archived",
        },
      }).unwrap();
      toast.success(message || "Status Changed Successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something Went Wrong");
    } finally {
      setStatusModal(false);
    }
  }

  // API HANDLERS FOR CALL LIST
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetAllCallsQuery({
      params: {
        limit: params.limit,
        offset: params.offset,
        ...otherParams,
      },
    });

  const handleModal = (rowData: any) => {
    setStatusModal(true);
    setRowData(rowData);
  };

  const columns = [
    {
      accessorFn: (row: any) => row.call_type ?? "-",
      id: "call_type",
      cell: (info: any) => (
        <Box sx={{ color: getCallTypeColor(info.getValue()) }}>
          {capitalizeFirstLetter(info.getValue()) ?? "-"}
        </Box>
      ),
      header: () => <span>CALL TYPE</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.direction ?? "-",
      id: "direction",
      cell: (info: any) => (
        <Box sx={{ color: "primary.main" }}>
          {capitalizeFirstLetter(info.getValue())}
        </Box>
      ),
      header: () => <span>Direction</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.duration ?? "-",
      id: "duration",
      cell: (info: any) => (
        <>
          <Box>{getFormattedDuration(info.getValue())}</Box>
          <Box sx={{ color: "primary.main" }}>
            {`(${info.getValue()} seconds)`}
          </Box>
        </>
      ),
      header: () => <span>Duration</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.from ?? "-",
      id: "from",
      cell: (info: any) => info.getValue(),
      header: () => <span>FROM</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.to ?? "-",
      id: "to",
      cell: (info: any) => info.getValue(),
      header: () => <span>TO</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.via ?? "-",
      id: "via",
      cell: (info: any) => info.getValue(),
      header: () => <span>VIA</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.created_at ?? "-",
      id: "created_at",
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
      header: () => <span>CREATED AT</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.is_archived,
      id: "status",
      cell: (info: any) => (
        <Box
          onClick={() => handleModal(info.row.original)}
          sx={{ cursor: "pointer" }}
        >
          <CustomChip
            variant={getVariant(info.getValue())}
            ChipProps={{
              label: info.getValue() ? "Archived" : "UnArchived",
            }}
          />
        </Box>
      ),
      header: () => <span>Status</span>,
    },
    {
      accessorFn: (row: any) => row.a_id,
      id: "Actions",
      cell: (info: any) => (
        <Box>
          <AddNote apiData={info.row.original} />
        </Box>
      ),
      header: () => <span>Actions</span>,
    },
  ];

  return (
    <Box>
      <WarningPrompt
        modal={statusModal}
        setModal={setStatusModal}
        heading="Warning"
        subTitle="Are You Sure You Want To Change Status"
        acceptButtonLabel="Yes Sure"
        acceptButtonProps={{
          loading: updateStatusLoading,
          onClick: () => {
            handleChangeStatus();
          },
        }}
      />
      <Box mb={2}>
        <TableHeader
          onChanged={(e) => {
            setOtherParams(e);
          }}
          showClearFilterButton
          tableHeaderData={tableHeaderData}
        />
      </Box>

      <CustomTable
        data={data?.nodes}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
        showSerialNo
        totalCount={data?.totalCount}
        totalPages={Math.ceil(data?.totalCount / params?.limit)}
        currentPage={params?.page}
        limit={params?.limit}
        onPageChange={(onPageData: any) => {
          setParams({
            ...params,
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />
    </Box>
  );
}
