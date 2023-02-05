import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./TuringTable.css"

const columns = [

       { field: 'calltype', headerName: 'Call Type', width: 120, },
       { field: 'direction', headerName: 'Direction', width: 120 },
       { field: 'duration', headerName: 'Duration', width: 120 },
       { field: 'from', headerName: 'From', width: 120 },
       { field: 'to', headerName: 'To', width: 120 },
       { field: 'via', headerName: 'VIA', width: 120 },
       { field: 'createdAt', headerName: 'Created At', width: 120 },
       { field: 'status', headerName: 'Status', width: 120, renderCell: ({ value }) => <button>Archived</button> },
       { field: 'action', headerName: 'Action', width: 120,  renderCell: ({ value }) => <button>Add Notes</button> }


];
const rows = [
       {
              id: 1, calltype: 'Snow', direction: 'Jon', duration: 35, from: '+4555576686', to: '+786578', via: '+987654', createdAt: '09-898-77',
              status: <button>Archived</button>,
              action: <button>Add Notes</button>
       },

];

function TuringTable() {
       return (
              <>
                     <div className='container' style={{ height: 400, width: '100%' }}>
                            <h4 className='py-4'>Turing Technology Frontend test</h4>
                            <DataGrid
                                   rows={rows}
                                   columns={columns}
                                   pageSize={5}
                                   rowsPerPageOptions={[5]}

                            />
                     </div>

              </>

       )
}

export default TuringTable;