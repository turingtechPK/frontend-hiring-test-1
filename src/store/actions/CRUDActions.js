// Service
import service from '../../services/Api/Service';

// Constants
import { CRUD_ACTION } from '../../constants/ActionKeys';
import { REDUX_STATES } from '../../constants/ReduxStates';


// General
import { request, success, failure } from '.';

const { 
  DEFAULT_ADD_KEY, 
  DEFAULT_VIEW_KEY, 
  DEFAULT_EDIT_KEY,
} = REDUX_STATES;

function add(api, params, key = DEFAULT_ADD_KEY ){
 
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.ADD_REQUEST, {key}));

      // API Calling
      const response = await service.postService(
        api,
        params
      );

      dispatch(success(CRUD_ACTION.ADD_SUCCESS, { response, key }));

      return response;
       

    } catch (error) {
      dispatch(failure(CRUD_ACTION.ADD_FAILURE, {key}));
      throw error;
    }
  };
}


function view(api, params, key = DEFAULT_VIEW_KEY){
 
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.VIEW_REQUEST, {key}));

      // API Calling
      const response = await service.getService(
        api,
        { params }
      );

      dispatch(success(CRUD_ACTION.VIEW_SUCCESS, { response, key }));

      return response;
       

    } catch (error) {
      dispatch(failure(CRUD_ACTION.VIEW_FAILURE,  {key}));
      throw error;
    }
  };
}


function edit(api, params, key = DEFAULT_EDIT_KEY){
 
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.EDIT_REQUEST, {key}));

      // API Calling
      const response = await service.postService(
        api,
        params
      );

      dispatch(success(CRUD_ACTION.EDIT_SUCCESS, { response, key }));

      return response;
       

    } catch (error) {
      dispatch(failure(CRUD_ACTION.EDIT_FAILURE, {key}));
      throw error;
    }
  };
}


function editWithPutService(api, params, key = DEFAULT_EDIT_KEY){
 
  return async (dispatch) => {
    try {
      dispatch(request(CRUD_ACTION.EDIT_REQUEST, {key}));

      // API Calling
      const response = await service.putService(
        api,
        params
      );

      dispatch(success(CRUD_ACTION.EDIT_SUCCESS, { response, key }));

      return response;
       

    } catch (error) {
      dispatch(failure(CRUD_ACTION.EDIT_FAILURE, {key}));
      throw error;
    }
  };
}



export {
  add,
  view,
  edit,
  editWithPutService
};
