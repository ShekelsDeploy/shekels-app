import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'accountData',
  initialState: {
    value: {
      roles:[],
      logged: 0,
      username: ''
    },
  },
  reducers: {
    setAccountData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAccountData } = accountSlice.actions

export default accountSlice.reducer