import CallsTable from "./calls-table";
import PaginationComponent from "./pagination";

const DashBoard = (props) => {
    const {
        calls,
        totalCalls,
        handlePaginationChange,
        handleArchiveCall,
        handleAddNote,
      } = props;

    return(
        <>
            <CallsTable calls={calls} handleAddNote={handleAddNote} handleArchiveCall={handleArchiveCall} />
            <PaginationComponent totalCalls={totalCalls} handlePaginationChange={handlePaginationChange} />
        </>
    )
}

export default DashBoard