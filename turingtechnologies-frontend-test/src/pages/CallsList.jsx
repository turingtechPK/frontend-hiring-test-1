import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import CallsContext from '../context/CallsContext'
import Header from '../components/Header'
import HeaderCalls from '../components/HeaderCalls'

function CallsList() {
    const {calls,fetchCalls} = useContext(CallsContext)
    useEffect(()=>{
        fetchCalls()
        console.log(calls)
    },[calls])
  return (
    <div>
        <HeaderCalls />
        <h2 className='p-5'>Turing Technologies Frontend Test</h2>
        <div className='px-5'>
        <table className="table border rounded px-5">
        <thead className='bg-light'>
            <tr>
            <th scope="col">CALL TYPE</th>
            <th scope="col">DIRECTION</th>
            <th scope="col">DURATION</th>
            <th scope="col">FROM</th>
            <th scope="col">TO</th>
            <th scope="col">VIA</th>
            <th scope="col">CREATED AT</th>
            <th scope="col">STATUS</th>
            <th scope="col">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
             {calls ? calls.nodes.map((item)=>(
              // <div key={item.id}>{item.direction}</div>
               <tr key={item.id}>
               <td className={item.call_type==='answered'?'text-primary': item.call_type==='voicemail'?'text-success':'text-danger'}>{item.call_type.charAt(0).toUpperCase() + item.call_type.slice(1)}</td>
               <td className='text-primary'>{item.direction.charAt(0).toUpperCase() + item.direction.slice(1)}</td>
               <td className='text-primary'>{item.duration} seconds</td>
               <td>{item.from}</td>
               <td>{item.to}</td>
               <td>{item.via}</td>
               <td>{item.created_at}</td>
               {item.is_archived ? <td><div className='archived'>Archived</div></td> : <td><div className='unarchive'>Unarchive</div></td>}
               <td><button className="btn btn-primary color-purple">Add Note</button></td>
             </tr>
             )) : 'Please wait'} 
        </tbody>
        </table>
        </div>
        </div>
  )
}

export default CallsList