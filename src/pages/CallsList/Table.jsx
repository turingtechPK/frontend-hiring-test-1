import { ConfigProvider, Modal, Table } from "antd"
import { TableCompWrapper } from "./elements"
import CallModal from "@components/CallModal";
import { useEffect, useState } from "react";
import axiosInstance from "@src/services/axiosService";
import moment from "moment";

const TableComp = ({data,pageNumber,setPageNumber,setData})=>{
  const [open, setOpen] = useState(false);
  const [selectedCall,setSelectedCall] = useState(null)
  const showModal = (record) => {
    setSelectedCall(record)
    setOpen(true);
  };

  const sortedData = data?.nodes?.sort((a,b)=>{
    return moment(a.created_at)>moment(b.created_at)
  })
  const handleCancel = () => {
    setOpen(false);
  };
  const changeArchivedStatus = async (id)=>{
    const resp= await axiosInstance.put(`/calls/${id}/archive`)
  }

  const handleOk = async ({note,id})=>{
    try{
      const resp = await axiosInstance.post(`/calls/${id}/note`,{content:note})
      // console.log("resp.data",resp.data)
      // const newNodes = data.nodes.map((node)=>{
      //   if(node.id===id){
      //     return resp.data
      //   }
      //   return node
      // })
      // const newData = {...data,nodes:newNodes}
      // setData(newData)
    }
    catch(err){
      console.log(err)
    }
    setOpen(false)
  }
  const secondsToMinutesAndSeconds=(seconds)=> {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${minutes} minutes and ${remainingSeconds} seconds`;

    return formattedTime;
  }
  const columns = [
    {
      title: 'CALL TYPE',
      dataIndex: 'call_type',
      key: 'call_type',
      render:(value,record)=>{
        const colorMap ={
          "missed":"#cd304f",
          "answered":"#26cbba",
          "voicemail":"#4267e9"
        }
        return <span style={{color:colorMap[value],textTransform:'capitalize'}}>{value}</span>
      }
    },
    {
      title: 'DIRECTION',
      dataIndex: 'direction',
      key: 'direction',
      render:(value,record)=>{
        return <span style={{color:"#4267e9",textTransform:'capitalize'}}>{value}</span>
      }
    },
    {
      title: 'DURATION',
      dataIndex: 'duration',
      key: 'duration',
      render:(value,record)=>{
        return <>
        <div>{secondsToMinutesAndSeconds(value)}</div>
        <span style={{color:"#4267e9",textTransform:'capitalize'}}>({value} seconds)</span>
        </>
      }
    },
    {
      title: 'FROM',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'TO',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'VIA',
      dataIndex: 'via',
      key: 'via',
    },
    {
      title: 'CREATED AT',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'STATUS',
      dataIndex: 'is_archived',
      key: 'is_archived',
      render:(value,record)=>{
        if(value){
          return (
            <div style={{padding:"0.5rem",cursor:"pointer", background:"#edfbfa",color:"#26cbba",textAlign:"center"}}
             onClick={()=>changeArchivedStatus(record.id)} >
              Archived
            </div>
          )
        }
        else{
          return (
            <div style={{padding:"0.5rem", cursor:"pointer",background:"#eeeeee",color:"#797979",textAlign:"center"}}
            onClick={()=>changeArchivedStatus(record.id)}>
              Unarchived
            </div>
        )
      }
      }
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render:(value,record)=>{
        return(
          <div style={{background:"#5047f8",textAlign:"center",color:"white",padding:"0.5rem",cursor:"pointer"}} onClick={()=>showModal(record)}>
            Add Note
          </div>
        )
      }
    },
  ]
  return(
    <>
     <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        width={502}
        closable={true}
        footer={null}
      >
        <CallModal
          isModalOpen={open}
          handleOk={handleOk}
          selectedCall={selectedCall}
        />
      </Modal>
    <ConfigProvider
    theme={{
      components: {
        Pagination: {
          itemActiveBg:"#4f46f8",
        },
      },
      token:{
        colorPrimary:"white",
      }
    }}
  >
    <TableCompWrapper>
    <Table columns={columns} bordered={true} dataSource={sortedData}
    pagination={{
      position:["bottomCenter"],
      total:data.totalCount,
      showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} results`,
      current:pageNumber,
      onChange:((page)=>setPageNumber(page)),
      showSizeChanger:false,
    }}
    />
    </TableCompWrapper>
  </ConfigProvider>
    </>
  )
}
export default TableComp
