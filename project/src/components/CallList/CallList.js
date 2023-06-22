import React, { useState, useEffect } from "react";

import CallListTable from "./CallListTable";
import AuthUser from "../User/AuthUser";
import "./CallList.css";

// const data = [
//   {
//     nodes: [
//       {
//         id: "bfd9690a-8707-4b31-81d2-6539ec037983",
//         duration: 42507,
//         is_archived: false,
//         from: "+33113826548",
//         to: "+33111812895",
//         direction: "inbound",
//         call_type: "missed",
//         via: "+33131768181",
//         created_at: "2023-06-16T02:29:35.415Z",
//         notes: [],
//       },
//       {
//         id: "4719f660-d91a-4543-9feb-eeb17216b96e",
//         duration: 39822,
//         is_archived: false,
//         from: "+33158438894",
//         to: "+33164004142",
//         direction: "inbound",
//         call_type: "answered",
//         via: "+33130082473",
//         created_at: "2023-06-16T03:10:20.143Z",
//         notes: [],
//       },
//       {
//         id: "7c0e7de2-d564-4566-b4b9-ec614893b8d9",
//         duration: 66332,
//         is_archived: false,
//         from: "+33129184078",
//         to: "+33131993046",
//         direction: "outbound",
//         call_type: "missed",
//         via: "+33143116996",
//         created_at: "2023-06-17T21:00:36.709Z",
//         notes: [],
//       },
//       {
//         id: "55221e76-5d1f-4b59-bede-74078aeca8fb",
//         duration: 39238,
//         is_archived: false,
//         from: "+33193345252",
//         to: "+33176753897",
//         direction: "inbound",
//         call_type: "voicemail",
//         via: "+33115613156",
//         created_at: "2023-06-16T06:44:19.687Z",
//         notes: [
//           {
//             id: "da46399b-ef1f-4027-98f3-ec11f0c10af8",
//             content: "Sed ut quia sit repellat illum qui.",
//           },
//         ],
//       },
//       {
//         id: "ec655d40-9fd4-4409-b190-3d069da77779",
//         duration: 65078,
//         is_archived: false,
//         from: "+33159167640",
//         to: "+33168843207",
//         direction: "inbound",
//         call_type: "missed",
//         via: "+33136267837",
//         created_at: "2023-06-20T23:12:06.624Z",
//         notes: [
//           {
//             id: "6b7baac7-7d62-4993-a234-985250d0715c",
//             content: "Et sed unde.",
//           },
//           {
//             id: "c46da87e-ebd3-4dff-b39b-b3741b500f2d",
//             content: "Expedita ut hic id est.",
//           },
//         ],
//       },
//       {
//         id: "0ded98e0-f4ee-405c-965d-e90371de2ae5",
//         duration: 81397,
//         is_archived: true,
//         from: "+33189684737",
//         to: "+33159302008",
//         direction: "inbound",
//         call_type: "missed",
//         via: "+33118378054",
//         created_at: "2023-06-17T07:49:32.710Z",
//         notes: [
//           {
//             id: "38dd5908-076d-4d19-8b7d-7d3777b530ef",
//             content: "Quis minus earum.",
//           },
//         ],
//       },
//       {
//         id: "ca3da3e8-9ea3-4746-988d-23e558d2a772",
//         duration: 53585,
//         is_archived: true,
//         from: "+33157504898",
//         to: "+33195216093",
//         direction: "inbound",
//         call_type: "missed",
//         via: "+33123875622",
//         created_at: "2023-06-16T19:34:40.683Z",
//         notes: [
//           {
//             id: "2418fb38-ce49-454b-95fa-ee49a9b313de",
//             content: "Suscipit esse rem et officiis est rerum.",
//           },
//         ],
//       },
//       {
//         id: "e17f2a8b-0b66-42f2-8e0a-5efb6f11bca9",
//         duration: 44423,
//         is_archived: false,
//         from: "+33141031741",
//         to: "+33176308558",
//         direction: "inbound",
//         call_type: "answered",
//         via: "+33139241884",
//         created_at: "2023-06-17T18:20:41.902Z",
//         notes: [],
//       },
//       {
//         id: "e7a514c4-ee07-4846-bceb-865a2af809db",
//         duration: 86750,
//         is_archived: true,
//         from: "+33130908993",
//         to: "+33120724186",
//         direction: "outbound",
//         call_type: "answered",
//         via: "+33178754710",
//         created_at: "2023-06-16T06:55:31.247Z",
//         notes: [
//           {
//             id: "dededeb0-eb74-40cd-a21a-1a050369325d",
//             content: "Sed aut a.",
//           },
//           {
//             id: "e30ff8ee-2f43-4436-bbbd-c57fdda9a806",
//             content: "Qui eos perspiciatis sapiente inventore cupiditate.",
//           },
//         ],
//       },
//       {
//         id: "8d2f20ec-ac40-4ea4-9e4f-ba56b9bf65a2",
//         duration: 35676,
//         is_archived: true,
//         from: "+33146057441",
//         to: "+33167613223",
//         direction: "inbound",
//         call_type: "missed",
//         via: "+33166303542",
//         created_at: "2023-06-22T03:21:34.843Z",
//         notes: [
//           {
//             id: "4592fcf1-862e-4b95-a065-76223f1e1bec",
//             content: "Est maxime nihil velit dolor error.",
//           },
//           {
//             id: "d1fd767f-35eb-469f-9537-2746fa056980",
//             content: "Possimus laborum deleniti autem.",
//           },
//         ],
//       },
//     ],
//     totalCount: 122,
//     hasNextPage: true,
//   },
// ];

const CallList = () => {
  const { http } = AuthUser();

  const [filter, setFilter] = useState("");

  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await http
        .get("/calls?offset:10&limit:10", {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("accessToken")
            )}`,
          },
        })
        .then((response) => {
          filterDataByStatus(response.data);
          setData(response.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [filter]);

  const filterDataByStatus = (data) => {

    switch (filter) {
        case 'Archived':
            data.nodes = data.nodes.filter((call) => call.is_archived === true);
            setData(data);
            return;
        case 'Unarchived':
            data.nodes = data.nodes.filter((call) => call.is_archived === false);
            setData(data);
            return;
        default:
            data.nodes = data.nodes.filter((call) => call);
            setData(data);
            return;

    }

  };

  const setFilterHandler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="call-list-title">
        <h2> Turing Technologies Frontend Test </h2>
      </div>

      <div className="call-list-table">
        <label style={{ paddingRight: 5 }}> Filter By: </label>
        <select onChange={setFilterHandler} value={filter}>
          <option value="All">All</option>
          <option value="Unarchived">Unarchived</option>
          <option value="Archived">Archived</option>
        </select>

        <CallListTable data={data} />
      </div>
    </React.Fragment>
  );
};

export default CallList;
