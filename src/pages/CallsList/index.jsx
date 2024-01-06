import { useEffect, useState } from "react"
import TableComp from "./Table"
import { CallsListPageWrapper } from "./elements"
import axiosInstance from "@src/services/axiosService"
import { Dropdown } from "antd"
import Pusher from 'pusher-js';
import { useAuth } from "@contexts/authContext"
import { useNavigate } from "react-router-dom"


const CallsList = ()=>{
  const [callListData,setCallListData] = useState([])
  const limit = 10
  const [pageNumber,setPageNumber] = useState(0)
  const {userData} = useAuth()
  const {loggedIn} = userData
  const navigate = useNavigate()
  const items = [
    {
      key: '1',
      label: (
        <p className="dropdown-option" >All</p>
      ),
    },
    {
      key: '2',
      label: (
        <p className="dropdown-option">Archived</p>
      ),
    },
    {
      key: '3',
      label: (
        <p className="dropdown-option">Unarchived</p>
      ),
    },
  ];
  useEffect(()=>{
    if(!loggedIn){
      navigate("/")
    }
  },[loggedIn])
  useEffect(()=>{
    const token = localStorage.getItem("accessToken")
    const pusherClient = new Pusher("d44e3d910d38a928e0be",{
      cluster:"eu",
      channelAuthorization:{
        endpoint:"https://frontend-test-api.aircall.dev/pusher/auth",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    })
    const channel = pusherClient.subscribe('private-aircall');
    channel.bind('update-call', function (data) {
      const newNodes = callListData.nodes.map((node)=>{
        if(node.id===data.id){
          return data
        }
        return node
      })
      const newData = {...callListData,nodes:newNodes}
      setCallListData(newData)
    });
    return ()=>{
      pusherClient.unbind_all();
      pusherClient.unsubscribe('private-aircall');
    }
  },[callListData.length===0])
  useEffect(()=>{
    axiosInstance.get("/calls",{params:{
      limit,
      offset:limit*pageNumber
    }}).then((resp)=>{
      setCallListData(resp.data)
    })
  },[limit,pageNumber])
  return (
    <>
    <CallsListPageWrapper>
      <h3 className="heading">Turning Technologies Frontend Test</h3>
      <TableComp data={callListData} setData={setCallListData} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
    </CallsListPageWrapper>
    </>
  )
}
export default CallsList
