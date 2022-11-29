import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show_route: false,
};


const routeReducer = createSlice({
  name: "route",
  initialState,
  reducers:{
    get_current_page: (state, actions) =>{
      state.show_route = actions.payload;
    }
  }
});

export const ShowRoute = (state) => state.route.show_route;
export const { get_current_page } = routeReducer.actions;
export default routeReducer.reducer;