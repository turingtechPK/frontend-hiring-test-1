// Service
import service from '../../services/Api/Service';

// Constatns
import { LISTING_ACTIONS } from '../../constants/ActionKeys';
import { REDUX_STATES } from '../../constants/ReduxStates';

// Helpers
import { getQueryParams } from '../../helpers/GeneralHelper';

// General
import { request, success, failure } from './index';

function getListingData(url, params, key=REDUX_STATES.DEFAULT_KEY) {

    //page ===offset

  return async (dispatch) => {
    try {
      dispatch(request(LISTING_ACTIONS.GET_REQUEST, {key, page: params?.offset }));

      // API Calling
      const response = await service.getService(
        url,
        {
          params: getQueryParams(params)
        }
      );

      dispatch(success(LISTING_ACTIONS.GET_SUCCESS, { response, key, page: params?.offset }));
      
      return response;
    } catch (error) {
      dispatch(failure(LISTING_ACTIONS.GET_FAILURE, {key}));
      throw error;
    }
  };
}

export {
  getListingData
};
