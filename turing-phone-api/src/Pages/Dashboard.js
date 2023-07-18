import { FormControl, InputLabel, MenuItem, Select, Table } from "@mui/material"
import MyTable from "../Components/MyTable/MyTable";
import Header from "../Components/Header/Header";

const Dashboard  = () => {
    

    // type Call {
    //     id: ID! // "unique ID of call"
    //     direction: String! // "inbound" or "outbound" call
    //     from: String! // Caller's number
    //     to: String! // Callee's number
    //     duration: Float! // Duration of a call (in seconds)
    //     is_archived: Boolean! // Boolean that indicates if the call is archived or not
    //     call_type: String! // The type of the call, it can be a missed, answered or voicemail.
    //     via: String! // Aircall number used for the call.
    //     created_at: String! // When the call has been made.
    //     notes: Note[]! // Notes related to a given call
    //   }

    // type note{
        // id: ID!
        // content: String!
    // }

    const testData = [
        {
        "id": 0,
        "direction": "Inbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 4823,
        "is_archived": false,
        "call_type": "Missed",
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note"
          }
        ]
        },
        {
        "id": 1,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 203,
        "call_type": "Answered",
        "is_archived": true,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        }
        ,
        {
        "id": 3,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 2043,
        "call_type": "Voice Mail",
        "is_archived": false,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        },
        {
        "id": 1,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 203,
        "call_type": "Answered",
        "is_archived": true,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        }
        ,
        {
        "id": 3,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 2043,
        "call_type": "Voice Mail",
        "is_archived": false,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        },
        {
        "id": 1,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 203,
        "call_type": "Answered",
        "is_archived": true,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        }
        ,
        {
        "id": 3,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 2043,
        "call_type": "Voice Mail",
        "is_archived": false,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        }
        ,
        {
        "id": 1,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 203,
        "call_type": "Answered",
        "is_archived": true,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        }
        ,
        {
        "id": 3,
        "direction": "Outbound",
        "from": "+33148288105",
        "to": "+33166114113",
        "duration": 2043,
        "call_type": "Voice Mail",
        "is_archived": false,
        "via": "+33148288105",
        "created_at": "12-08-2022",
        "notes" : [
          {
           "id": 0,
            "content": "Test Note 2"
          }
        ]
        }
      ]
      


    return(
        <div>  
        <Header/>
            <div className="App-body">
                <div className="pa5">
                <h1>Turing Technologies Frontend Test: Phone API</h1>
                <p>By Ibrahim Razzaque Bhatti</p>
                </div>
                <div className="flex display-cells pl4">
                <div>
                    <p>Filter By: </p>
                </div>
                <div className="pl3">
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="All"
                        defaultValue="All"
                        // onChange={}
                        >
                        <MenuItem lavalue="All">All</MenuItem>
                        <MenuItem value="Archived">Archived</MenuItem>
                        <MenuItem value="Unarchived">Unarchived</MenuItem>
                        </Select>
                    </div>
                </div>

                <MyTable data={testData}/>
            </div>
        </div>
      )

}

export default Dashboard;