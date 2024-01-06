import { Input } from "antd"
import { CallModalContainer, Line } from "./elements"
import Button from "@components/Button"
import { useState } from "react"

const CallModal = ({selectedCall,handleOk})=>{
  const [note,setNote] = useState("")
  const handleNoteChange = (e)=>{
    setNote(e.target.value)
  }
  const secondsToMinutesAndSeconds=(seconds)=> {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${minutes} minutes and ${remainingSeconds} seconds`;

    return formattedTime;
  }
  if(!selectedCall){
    return null
  }
  return (
    <>
    <CallModalContainer>
      <div className="header">
        <div className="title-container">
          <div className="title">Add Notes</div>
          <div className="purple-text">Call Id # {selectedCall?.id} </div>
        </div>
      </div>
        <Line/>
        <div className="main">

          <div className="row">
            <div className="title">Call type</div>
            <div className="value purple-text">{selectedCall?.call_type}</div>
          </div>

          <div className="row">
            <div className="title">Duration</div>
            <div className="value">{secondsToMinutesAndSeconds(selectedCall?.duration)}</div>
          </div>

          <div className="row">
            <div className="title">From</div>
            <div className="value">{selectedCall?.from}</div>
          </div>

          <div className="row">
            <div className="title">To</div>
            <div className="value">{selectedCall?.to}</div>
          </div>

          <div className="row">
            <div className="title">Via</div>
            <div className="value">{selectedCall?.via}</div>
          </div>

          <div className="row" >
            <div className="title">
              Notes
            </div>
            <div className="note-container">
              <ol>
                {selectedCall?.notes?.map((note,index)=>{
                  return (
                    <li key={note.id}>
                      {note.content}
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
          <Input.TextArea className="text-area" onChange={(e)=>handleNoteChange(e)}/>
          <Line/>
        </div>
          <Button text={"Save"} clickHandler={async ()=>{
            await handleOk({note,id:selectedCall?.id})
            setNote("")
          }}/>
    </CallModalContainer>
    </>
  )
}
export default CallModal
