import { USER_ACTIONS, GENERAL_ACTIONS} from '../../constants/ActionKeys';

let initialState = {
  loading: false,
  error:false,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {

  // Login
  case USER_ACTIONS.LOGIN_REQUEST:
    return { 
      ...state,
      loading: true,
      error: false
    };

  case USER_ACTIONS.LOGIN_SUCCESS:
    return { 
      ...state,
      loading:false,
      error: false
    };

  case USER_ACTIONS.LOGIN_FAILURE:
    return { 
      ...state,
      loading:false,
      error: true
    };

  // Token Check 
  case GENERAL_ACTIONS.ACTIVE_TOKEN_CHECK_REQUEST:
    return { 
      ...state,
      loading: true,
      error: false
    };
    
  case GENERAL_ACTIONS.ACTIVE_TOKEN_CHECK_SUCCESS:

    return { 
      ...state,
      loading:false,
      error: false,
    };
    
  case GENERAL_ACTIONS.ACTIVE_TOKEN_CHECK_FAILURE:
    return { 
      ...state,
      loading:false,
      error: true
    };

  default:
    return state;
  }
};

export default Auth;