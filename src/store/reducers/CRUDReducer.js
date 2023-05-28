// Constatns
import { CRUD_ACTION } from '../../constants/ActionKeys';
import { REDUX_STATES } from '../../constants/ReduxStates';

const {
  DEFAULT_ADD_KEY,
  DEFAULT_EDIT_KEY,
  DEFAULT_DEL_KEY,
  DEFAULT_VIEW_KEY,
  LOADING,
  ERROR,
  ADD,
  VIEW,
  EDIT
} = REDUX_STATES;

let initialState = {};

const Crud = (state = initialState, action) => {

  switch (action.type) {
  /* Add */
  //Request  
  case CRUD_ACTION.ADD_REQUEST:
    const add_keyR = action?.payload?.key || DEFAULT_ADD_KEY;
  
    return { 
      ...state,
      [add_keyR + LOADING]: true,
      [add_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.ADD_SUCCESS:
    const add_keyS = action?.payload?.key || DEFAULT_ADD_KEY;
    const add_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [add_keyS + LOADING]: false,
      [add_keyS + ERROR]: false,
      [add_keyS + ADD]: add_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.ADD_FAILURE:
    const add_keyE = action?.payload?.key || DEFAULT_ADD_KEY;
  
    return { 
      ...state,
      [add_keyE + LOADING]: false,
      [add_keyE + ERROR]: true
    };

  /* View */
  //Request  
  case CRUD_ACTION.VIEW_REQUEST:
    const view_keyR = action?.payload?.key || DEFAULT_VIEW_KEY;
    
    return { 
      ...state,
      [view_keyR + LOADING]: true,
      [view_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.VIEW_SUCCESS:
    const view_keyS = action?.payload?.key || DEFAULT_VIEW_KEY;
    const view_responseS = action?.payload?.response?.data;

    return { 
      ...state,
      [view_keyS + LOADING]: false,
      [view_keyS + ERROR]: false,
      [view_keyS + VIEW]:  view_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.VIEW_FAILURE:
    const view_keyE = action?.payload?.key || DEFAULT_VIEW_KEY;
  
    return { 
      ...state,
      [view_keyE + LOADING]: false,
      [view_keyE + ERROR]: true
    };

  /* Edit */
  //Request  
  case CRUD_ACTION.EDIT_REQUEST:
    const edit_keyR = action?.payload?.key || DEFAULT_EDIT_KEY;
    return { 
      ...state,
      [edit_keyR + LOADING]: true,
      [edit_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.EDIT_SUCCESS:
    const edit_keyS = action?.payload?.key || DEFAULT_EDIT_KEY;
    const edit_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [edit_keyS + LOADING]: false,
      [edit_keyS + ERROR]: false,
      [edit_keyS + EDIT]: edit_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.EDIT_FAILURE:
    const edit_keyE = action?.payload?.key || DEFAULT_EDIT_KEY;
  
    return { 
      ...state,
      [edit_keyE + LOADING]: false,
      [edit_keyE + ERROR]: true
    };

  /* Delete */
  //Request  
  case CRUD_ACTION.DELETE_REQUEST:
    const del_keyR = action?.payload?.key || DEFAULT_DEL_KEY;
    return { 
      ...state,
      [del_keyR + LOADING]: true,
      [del_keyR + ERROR]: false,
    };
  
    // Success
  case CRUD_ACTION.DELETE_SUCCESS:
    const del_keyS = action?.payload?.key || DEFAULT_DEL_KEY;
    const del_responseS = action?.payload?.response;
      
    return { 
      ...state,
      [del_keyS + LOADING]: false,
      [del_keyS + ERROR]: false,
      [del_keyS + EDIT]: del_responseS
        
    };
  
    // Failure
  case CRUD_ACTION.DELETE_FAILURE:
    const del_keyE = action?.payload?.key || DEFAULT_DEL_KEY;
  
    return { 
      ...state,
      [del_keyE + LOADING]: false,
      [del_keyE + ERROR]: true
    };

  default:
    return state;
  }
};

export default Crud;