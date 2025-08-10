import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userslice",
    initialState:{
        user:{},
        islogged:false
    },
    reducers:{
        addUser:(state,action)=>{
            state.user=action.payload
            state.islogged=true

        }      
    }
        

    
})
export const  {addUser} =userSlice.actions
export default userSlice.reducer;