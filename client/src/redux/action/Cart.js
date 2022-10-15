export const addToCartAction = (state, action) => {
  // state.push(action.payload)
  return [ ...state, action.payload ];
};

export const removeFromCartAction = (state, action) => {
  const filtered_state = state.filter(
    filter => filter._id.$oid !== action.payload,
  );
  return filtered_state;
};

export const clearCartAction = () => {
  return []
};
