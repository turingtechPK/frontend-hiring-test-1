import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { MDBDataTableV5 } from 'mdbreact';
import {BaseAPIURL, isEmpty} from './common';
import BeatLoader from "react-spinners/BeatLoader";
import swal from 'sweetalert';


// type Note = {
//   id:  String
//   content: String
// };
// type Call =  {
//   id: String 
//   direction: String // "inbound" or "outbound" call
//   from: String // Caller's number
//   to: String // Callee's number
//   duration: number // Duration of a call (in seconds)
//   is_archived: Boolean // Boolean that indicates if the call is archived or not
//   call_type: String // The type of the call, it can be a missed, answered or voicemail.
//   via: String // Aircall number used for the call.
//   created_at: String // When the call has been made.
//   notes: Note[] // Notes related to a given call
// }

export default function Calls() {

    
       const [posts, setPosts] = useState({});
       const [loaded, setLoaded] = useState(false);
       const token = localStorage.getItem('token');
       const [datatable, setDatatable] : any = useState({});
       const [offset, setOffset] = useState(0);
       const [limit, setLimit] = useState(10);
       const [password, setPassword] = useState(sessionStorage.getItem('password'));
       const [email, setEmail] = useState(sessionStorage.getItem('userName'));
       const [hasNextPage, setHasNextPage] = useState(true);
       const [totalCount, setTotalCount] = useState(0);


       const refreshToken = () => {

        const userObject = {
          username: email,
          password: password
      };
        
      axios.post(BaseAPIURL+'auth/refresh-token', userObject, {
        headers: {
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
       })
          .then((res) => {
            console.log(res.data);
            console.log(res.data.access_token);

              localStorage.setItem("token",res.data.access_token);
              if(!isEmpty(res?.data?.access_token)){
                swal({
                  text: "Token has been updated successfully",
                  icon: "success",
                });                
              }
                         
          }).catch((error) => {
              console.log(error)
       
          });
      };


       useEffect(() => {
        axios.get(BaseAPIURL + `calls?offset=${offset}&limit=${limit}`, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           }).then((res) => {
            setPosts(res.data.nodes);
            setTotalCount(res.data.totalCount);
            setHasNextPage(res.data.hasNextPage);
            console.log(res.data.totalCount);
            console.log(res.data.hasNextPage);
            setDatatable({
              columns: [
                {
                  label: 'From',
                  field: 'from',
                  width: 150,
                  attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'from',
                  },
                },
                {
                  label: 'To',
                  field: 'to',
                  width: 150,
                },
                {
                  label: 'Direction',
                  field: 'direction',
                  width: 200,
                },
                {
                  label: 'Call Type',
                  field: 'call_type',
                  width: 100,
                },
                {
                  label: 'Created date',
                  field: 'created_at',
                  width: 150,
                },
                {
                  label: 'Via',
                  field: 'via',
                  sort: 'disabled',
                  width: 100,
                },
               
              ],
              rows: res.data.nodes,
            });
            setLoaded(true);
            console.log(res.data.nodes);
            console.log(res);
    })},[offset]);


  return (
    <div className="calls">
      <div className="container">

    { !loaded && (<div className="loader"><BeatLoader color={'#4f46f8'} size={70} /></div>) }

    { loaded && (<div className="calls-data">
      <div className="headings">
      <div>
        <h3>Users call data</h3>
        { hasNextPage ? <Button  type="button" className="btn btn-primary" onClick={()=> {setOffset(offset + 10);setLoaded(false)} }>Get Next 10 calls data</Button>
        : <Button type="button" disabled className="btn btn-primary" onClick={()=> {setOffset(offset + 10);setLoaded(false)} }>Get Next 10 calls data</Button> }
        
         <Button type="button" className="btn btn-primary ms-3" onClick={()=> {refreshToken()} }>Refresh Token</Button>
      </div>
    <div>
      <div>User : <b>{email}</b></div>
      <div className="mt-4 float-end">{offset + 1 + ' to ' + (offset + 10) +' of ' } <b>{totalCount}</b></div>      
      </div>
      </div>
      <MDBDataTableV5 hover entriesOptions={[3, 5, 10]} entries={5} pagesAmount={4} data={datatable} />
    <br />
    
    </div>) }

    </div>
    </div>
  );
}