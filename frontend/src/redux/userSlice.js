import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userslice",
    initialState:{
        username:"",
        avatar:"",
        channel:0,
        token:""
    },
    reducers:{
        addUser:(state,action)=>{
            state.username=action.payload.username
            state.avatar=action.payload.avatar
            state.channel=action.payload.channel
            state.token=action.payload.token
        }      
    }
        

    
})
export const  {addUser} =userSlice.actions
export default userSlice.reducer;