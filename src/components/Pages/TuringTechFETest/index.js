
import React, { useEffect, useState } from 'react';

// Antd
import { Tooltip, Button, notification, Modal } from 'antd';

//Helpers
import { errorMessage, getTimeInMinAndSec, success } from '../../../helpers/GeneralHelper';

// Redux
import {
  useDispatch,
  useSelector
} from 'react-redux';

// Constants
import { API_URLS } from '../../../constants/ApiUrl';
import {REDUX_STATES} from '../../../constants/ReduxStates';
import { DATE_FORMAT, LISTING_DATA } from '../../../constants/General';
import { FILTER_OPTIONS, TURING_CONSTANTS } from './Constants';

//actions
import { getListingData } from '../../../store/actions/ListingActions';

//Common
import Listing from '../../Common/Listing';

//time
import moment from 'moment';
import { editWithPutService, edit, view } from '../../../store/actions/CRUDActions';
import AddNote from './AddNote';


function TuringTechFETest(){

  const dispatch = useDispatch();

  //local state
  const [tableData, setTableData] = useState([]);
  const [savedPageNumber, setSavedPageNumber] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  
  const [filterValue, setFilterValue] = useState(FILTER_OPTIONS?.[0]?.value); //all

 
  // Redux States
  const {
    [REDUX_STATES.TURING_TECH + REDUX_STATES.LIST] : listingData,
    [REDUX_STATES.TURING_TECH + REDUX_STATES.LOADING] : listingDataLoad,
  
  } = useSelector((state) => state?.Listing);

  const {
    [REDUX_STATES.CHANGE_ARCHIVE_STATUS + REDUX_STATES.LOADING] : loadingArchiveStatus,
    [REDUX_STATES.NOTES + REDUX_STATES.LOADING] : loadingAddNotes,
    [REDUX_STATES.SINGLE_CALL + REDUX_STATES.VIEW] : popUpData,
    [REDUX_STATES.SINGLE_CALL + REDUX_STATES.LOADING] : popUpDataLoad,
  } = useSelector((state) => state?.Crud);

  
  useEffect(()=>{
    let itemList =[];
    for(let i=0;i<listingData?.[TURING_CONSTANTS.NODES]?.length; i++){
      let item = {
        ...listingData?.[TURING_CONSTANTS.NODES][i],
        [TURING_CONSTANTS.DIRECTION]: <p style={{color:'#3A4BAD'}}>{listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.DURATION]}</p>,

        [TURING_CONSTANTS.CALL_TYPE]: 
        
        <span style={
          listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.CALL_TYPE] === 'missed'?
            {color:'red'}
            :
            listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.CALL_TYPE] === 'answered'?
              {color:'#38daae'}
              :
              {color:'#3A4BAD'}
        }>
          {listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.CALL_TYPE]}
        </span>,


        [TURING_CONSTANTS.DURATION]: 
        <>
          <p>{getTimeInMinAndSec(listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.DURATION])}</p>
          <p style={{color: '#3A4BAD'}}>{'(' + listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.DURATION] + ') seconds'}</p>
        
        </>,
        [TURING_CONSTANTS.CREATED_AT]: moment(listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.CREATED_AT]).format(DATE_FORMAT)
      };

      if(filterValue === FILTER_OPTIONS?.[0]?.value){
        itemList.push(item)
      }
      else if(filterValue === FILTER_OPTIONS?.[1]?.value){
        listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.STATUS] && itemList.push(item)
      }
      else{
        !listingData?.[TURING_CONSTANTS.NODES][i]?.[TURING_CONSTANTS.STATUS] && itemList.push(item)
      }
      
    }
    setTableData(itemList)
  },[listingData]);

  const archiveOrUnarchiveAPI =(id)=>{

    dispatch(editWithPutService(
      API_URLS.TURING_TECH.ARCHIVE_UNARCHIVE?.replace(':id', id), 
      {},
      REDUX_STATES.CHANGE_ARCHIVE_STATUS
    )).then(()=>{
      success('Status Changed Successfully')
      getList(savedPageNumber)
    }, (e)=>
      errorMessage('ERROR changing status'))
  }

  const columns = [
    {
      title: 'CALL TYPE',
      dataIndex: [TURING_CONSTANTS.CALL_TYPE], 
      key: [TURING_CONSTANTS.CALL_TYPE],
      width: 50,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'DIRECTION',
      dataIndex: [TURING_CONSTANTS.DIRECTION], 
      key: [TURING_CONSTANTS.DIRECTION], 
      width: 50,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'DURATION',
      dataIndex: [TURING_CONSTANTS.DURATION], 
      key: [TURING_CONSTANTS.DURATION],
      width: 50,
      ellipsis: {
        showTitle: false,
      },
      // render: (address) => (
      //   <Tooltip placement="topLeft" title={address}>
      //     {address}
      //   </Tooltip>
      // ),
    },
    {
      title: 'FROM',
      dataIndex: [TURING_CONSTANTS.FROM], 
      key: [TURING_CONSTANTS.FROM], 
      width: 50,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'TO',
      dataIndex: [TURING_CONSTANTS.TO], 
      key: [TURING_CONSTANTS.TO],
      width: 50,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'VIA',
      dataIndex: [TURING_CONSTANTS.VIA], 
      key: [TURING_CONSTANTS.VIA], 
      width: 50,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'CREATED AT',
      dataIndex: [TURING_CONSTANTS.CREATED_AT], 
      key: [TURING_CONSTANTS.CREATED_AT], 
      width: 50,
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'STATUS',
      dataIndex: [TURING_CONSTANTS.STATUS], 
      key: [TURING_CONSTANTS.STATUS], 
      width: 50,
      render: (address, record) => (

        <a 
          className='tableButtons'
          style={record?.[TURING_CONSTANTS.STATUS] ?
            {color:'#38daae', backgroundColor:'#F6F2F2'} : {color:'gray', backgroundColor:'#C3C3C3'}}
          onClick={()=>archiveOrUnarchiveAPI(record?.id)}>  
          <span>{record?.[TURING_CONSTANTS.STATUS] ? 'Archived' :  'Unarchive'}</span>
        </a>
  
      ),
    },
    {
      title: 'Actions',
      dataIndex: [TURING_CONSTANTS.ACTIONS], 
      key: [TURING_CONSTANTS.ACTIONS], 
      width: 50,
      render: (address, record) => (
        
        <Button  
          className='tableButtons'
          type="primary"
          
          onClick={()=>{
            callViewAPI(record?.id)
          }}>  
            Add Note
        </Button>

      ),
    },
    
  ];

  const callViewAPI =(id)=>{
    dispatch(view(API_URLS.TURING_TECH.GET_CALL?.replace(':id', id), {}, REDUX_STATES.SINGLE_CALL)).then(()=>{
      setShowPopUp(true)
    })
  }

  //on load run the api
  useEffect(()=>{
    getList()
  },[])

  const getList=(pageNumber = LISTING_DATA.FIRST_PAGE)=>{

    setSavedPageNumber(pageNumber);

    dispatch(getListingData(API_URLS.TURING_TECH.GET_ALL, {
      offset: pageNumber, //page number
      limit: LISTING_DATA.PAGE_SIZE //page size
    }, REDUX_STATES.TURING_TECH)) 
  }

  const addNotesAPI =(values, id)=>{
    dispatch(edit(API_URLS.TURING_TECH.ADD_NOTES?.replace(':id', id), {content: values?.notes}, REDUX_STATES.NOTES)).then(()=>{
      setShowPopUp(false);
      getList(savedPageNumber);
      success('Notes Added Successfully')
    },(e)=>{
      errorMessage('Error adding notes'); 
      setShowPopUp(false)
    })
  }

  const handleFilterChange =(value)=>{
    setFilterValue(value);
    getList(savedPageNumber)
  }

  return(
    <div>

      <Listing
        loading={listingDataLoad || loadingArchiveStatus || loadingAddNotes || popUpDataLoad}
        columns={columns}
        dataSource={tableData}
        heading={'Turing Technologies Frontend Test'}
        totalRecords={listingData?.totalCount}
        getList={getList}
        filterOptions={FILTER_OPTIONS}
        defaultValueFilter={FILTER_OPTIONS?.[0]?.value}
        handleFilterChange={handleFilterChange}
        filterByText={'Status'}
      />
      
      {
        showPopUp &&
        <Modal
          visible={showPopUp}
          closable={true}
          footer={null}
          onCancel={()=>setShowPopUp(false)}
        >
          <AddNote
            id={popUpData?.id}
            callType={popUpData?.[TURING_CONSTANTS.CALL_TYPE]}
            duration ={popUpData?.[TURING_CONSTANTS.DURATION]}
            from ={popUpData?.[TURING_CONSTANTS.FROM]}
            to={popUpData?.[TURING_CONSTANTS.TO]}
            via={popUpData?.[TURING_CONSTANTS.VIA]}
            notes={popUpData?.[TURING_CONSTANTS.NOTES]}
            onSave={addNotesAPI}
          />
        </Modal>
      }

    </div>
  )
}
export default TuringTechFETest