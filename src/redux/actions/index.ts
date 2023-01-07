export const setAuthenticationStatus = (data = 'loading') => {
  return {
    type: 'SET_AUTHENTICATED',
    payload: data,
  };
};
