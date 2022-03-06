import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: [],
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveOrders: (state , action) => {
      state.order = action.payload;
    },
    addOrder: (state , action) => {
      const {order , user} = action.payload;
      order['user'] = {...user}
      state.order.push(order);
    },
    orderPaypal: (state , action) => {
        const {paid , dateOfPayment , id , paymentId , method , delivered} = action.payload;
        const idx = state.order.findIndex(x => x._id === id);
        if(idx >= 0) {
          state.order[idx] = {
            ...state.order[idx],
            paid: paid,
            dateOfPayment: dateOfPayment,
            paymentId: paymentId,
            method: method,
            delivered: delivered,
          }
        }
    },
    orderPaypalByAdmin: (state , action) => {
        const {paid , dateOfPayment , id  , method } = action.payload;
        const idx = state.order.findIndex(x => x._id === id);
        if(idx >= 0) {
          state.order[idx] = {
            ...state.order[idx],
            paid: paid,
            dateOfPayment: dateOfPayment,
            method: method,
          }
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const {saveOrders , addOrder , orderPaypal , orderPaypalByAdmin} = orderSlice.actions

export default orderSlice.reducer