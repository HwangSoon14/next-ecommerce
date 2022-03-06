import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveUsers: (state, action) => {
            state.users = [...action.payload.users];
    },
   removeUser: (state ,action) => {
    const {id} = action.payload;
    const index = state.users.findIndex(x => x._id === id);
    if(index >= 0) {
      state.users.splice(index , 1);
    }
   },
   updateRole: (state , action) => {
    const {role , id} = action.payload;
    const index = state.users.findIndex(x => x._id === id);
    if(index >= 0) {
      state.users[index].role = role;
    }
   }
  },

})

// Action creators are generated for each case reducer function
export const { saveUsers , removeUser , updateRole} = usersSlice.actions

export default usersSlice.reducer