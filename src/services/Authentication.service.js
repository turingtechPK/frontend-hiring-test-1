class AuthenticationService {
    login(token) {
        localStorage.setItem("token", JSON.stringify('Bearer ' + token));
    }

    logout() {
        localStorage.clear();
    }

    getToken() {
        return JSON.parse(localStorage.getItem('token'));
    }

    updateToken(token) {
        localStorage.setItem("token", JSON.stringify('Bearer ' + token));
    }
}

export default new AuthenticationService();
