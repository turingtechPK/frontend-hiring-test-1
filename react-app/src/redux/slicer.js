import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    token: null
}

export const slicer = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setToken: (state, action) => { state.token = action.payload },
        reset: () => INITIAL_STATE
    },

})

export const { setToken, reset } = slicer.actions

export default slicer.reducer
