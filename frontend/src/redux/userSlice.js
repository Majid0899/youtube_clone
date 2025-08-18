import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"userslice",
    initialState:{
        id:"",
        username:"",
        avatar:"",
        channel:false,
        token:""
    },
    reducers:{
        addUser:(state,action)=>{
            state.username=action.payload.username
            state.avatar=action.payload.avatar
            state.channel=action.payload.channel
            state.token=action.payload.token
            state.id=action.payload.id
        }      
    }
        

    
})
export const  {addUser} =userSlice.actions
export default userSlice.reducer;