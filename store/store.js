import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import usersSlice from './slice/usersSlice'
import cartSlice from './slice/cartSlice'
import orderSlice from './slice/orderSlice'
import categoriesSlice from './slice/categoriesSlice'
export const store = configureStore({
  reducer: {
      user: userSlice,
      cart: cartSlice,
      order: orderSlice,
      users: usersSlice,
      categories: categoriesSlice,
  },
})