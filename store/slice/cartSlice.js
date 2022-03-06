import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  count: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state , action ) => {
        const {product , quantity} = action.payload;
        const {cart} = current(state);
        const thisIndex = cart.findIndex(x => x.product._id === product._id);
        if(thisIndex >= 0) {
            state.cart[thisIndex].quantity += quantity;
        } else {
          state.cart.push({product , quantity})
        }
        state.count += quantity;
    },
    saveAll: (state , action) => {
        state.cart = action.payload;
        let tempCount = action.payload.reduce((total,currentValue) => {
                return total + currentValue.quantity;
        }, 0)
        state.count = tempCount;
    },    
    increase: (state , action) => {
        const id = action.payload;
        const index = state.cart.findIndex(x => x.product._id === id);
        if(index >= 0) {
          state.cart[index].quantity += 1;
          state.count++;
        }
    },
    decrease: (state , action) => {
      const id = action.payload;
      const index = state.cart.findIndex(x => x.product._id === id);
      if(index >= 0) {
        if(state.cart[index].quantity > 1) 
        {
          state.cart[index].quantity -= 1;
        state.count--;
        }
      }
    },
    removeItem: (state , action) => {
      const id = action.payload;
      const index = state.cart.findIndex(x => x.product._id === id);
      if(index >= 0) {
        state.count -= state.cart[index].quantity;
        state.cart.splice(index , 1);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart , saveAll , increase,decrease , removeItem} = cartSlice.actions

export default cartSlice.reducer