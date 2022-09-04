import {  createSlice } from '@reduxjs/toolkit';





export const subsSlice = createSlice({
  name: 'subs',
  initialState:{
    subs: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    subs_int: (state,action) => {
      state.subs=action.payload;
    },
    subs_out: (state) =>{
      state.subs =null;
    }
  },

});

export const { subs_int,subs_out} = subsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined in line where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectsubs = (state) => state.subs.subs;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default subsSlice.reducer;