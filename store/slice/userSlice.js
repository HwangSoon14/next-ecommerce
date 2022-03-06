import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  token: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state, payload) => {
        const { user , access_token} = payload.payload;
        state.user = {...user};
        state.token = access_token;
    },
    logout: (state) => {
      state.user = {};
      state.token = '';
    }
  },

})

// Action creators are generated for each case reducer function
export const { save , logout } = userSlice.actions

export default userSlice.reducer