const ENDPOINTS = {
    login: '/auth/login',
    getCurrentUser: '/me',
    refreshToken: '/auth/refresh-token',

    calls: {
        getCallsList: '/calls?offset=:offset&limit=:limit',
        getCallDetail: '/calls/:id',
        createCallNote: '/calls/:id/note',
        archiveCall: '/calls/:id/archive'
    }
}

export default ENDPOINTS;
