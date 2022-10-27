export const addToCartAction = (state, action) => {
  // state.push(action.payload)
  if(state.some(element => element._id === action.payload._id)){
    let allState = [...state];
    let itemCart = state.find(item => item._id === action.payload._id);
    const index = state.indexOf(itemCart);
    itemCart.quantity += 1;
    allState[index] = itemCart;
    state = [...allState]
    console.log(state[index]);
  } else {
    return [...state, { ...action.payload, quantity: 0 }];
  }
};

export const removeFromCartAction = (state, action) => {
  const filtered_state = state.filter(
    filter => filter._id !== action.payload,
  );
  return filtered_state;
};

export const clearCartAction = () => {
  return []
};
