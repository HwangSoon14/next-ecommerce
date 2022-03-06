import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: []
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
   addCategories: (state , action) => {
     const { newCategory} = action.payload;
       state.categories.push(newCategory);
   },
   saveCategories: (state , action) => {
     const {categories} = action.payload
     state.categories = [...categories];
   },
   removeCategory: (state , action) => {
     const {id} = action.payload;
     const index = state.categories.findIndex(x => x._id === id);
     if(index >= 0) {
       state.categories.splice(index,1);
     }
   },
   updateCategory: (state ,action) => {
     const {category} = action.payload;
     const index = state.categories.findIndex(x => x._id === category._id);
     if(index >=0 ) {
       state.categories[index] = {...category};
     }
   }
  },

})

// Action creators are generated for each case reducer function
export const { addCategories , saveCategories , removeCategory , updateCategory} = categoriesSlice.actions

export default categoriesSlice.reducer