const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds

export const checkUserAuthentication = () => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
        return false;
    }
    
    // Get the timestamp when the token was stored in local storage
    const storedTimestamp = parseInt(localStorage.getItem('authTokenTimestamp'));
    const currentTimestamp = Date.now();

    if (!storedTimestamp || currentTimestamp - storedTimestamp >= TEN_MINUTES) {
        // Token is more than 10 minutes old, refresh the token
        return false;
    }
        
    return true;
} 