import { createSlice } from "@reduxjs/toolkit";


const searchSlice=createSlice({
    name:"search",
    initialState:{
        searchText:""
    },
    reducers:{
        addSearchText:(state,action)=>{
            state.searchText=action.payload
        }
    }
})

export const {addSearchText} =searchSlice.actions
export default searchSlice.reducer