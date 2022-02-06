import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { MDBDataTableV5 } from 'mdbreact';
import { isEmpty } from '../utils/Common';
import { BaseURL } from '../utils/BaseURL'
import CircleLoader from "react-spinners/CircleLoader";
import swal from 'sweetalert';
import { Container } from "react-bootstrap";



type Note = {
  id:  String
  content: String
};
type Call =  {
  id: String
  direction: String // "inbound" or "outbound" call
  from: String // Caller's number
  to: String // Callee's number
  duration: number // Duration of a call (in seconds)
  is_archived: Boolean // Boolean that indicates if the call is archived or not
  call_type: String // The type of the call, it can be a missed, answered or voicemail.
  via: String // Aircall number used for the call.
  created_at: String // When the call has been made.
  notes: Note[] // Notes related to a given call
}

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

      axios.post(BaseURL+'auth/refresh-token', userObject, {
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
        axios.get(BaseURL + `calls?offset=${offset}&limit=${limit}`, {
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

    { !loaded && (<div className="loader"><CircleLoader
 color={'#4f46f8'} size={70} /></div>) }

    { loaded && (<div className="calls-data">
      <div className="headings">
      <div>
        <Container>

        <h2>Users Information</h2>
        </Container>
        { hasNextPage ? <Button  type="button" className="btn btn-primary" onClick={()=> {setOffset(offset + 5);setLoaded(false)} }><i className="fas fa-arrow-right"></i></Button>
        : <Button type="button" disabled className="btn btn-primary" onClick={()=> {setOffset(offset + 5);setLoaded(false)} }>Next 5 calls data</Button> }

         <Button type="button" className=" ms-3" onClick={()=> {refreshToken()} }>Refresh<i className="fas fa-redo-alt"></i></Button>
      </div>
    <div>
      <div><i className="fa fa-user m-3" aria-hidden="true"></i><b>{email}</b></div>
      <div className="mt-4 float-end">{offset + 1 + ' to ' + (offset + 5) +' of ' } <b>{totalCount}</b></div>
      </div>
      </div>
      <MDBDataTableV5 hover entriesOptions={[3, 5, 10]} entries={5} pagesAmount={4} data={datatable} />
    <br />

    </div>) }

    </div>
    </div>

  );
}
