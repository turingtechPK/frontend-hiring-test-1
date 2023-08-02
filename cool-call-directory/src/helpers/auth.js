export const checkUserAuthentication = () => {
    const authToken = localStorage.getItem('authToken');
    return !!authToken;
} 