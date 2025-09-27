import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    applications:[],
}


const loanslice =createSlice({
    name:"loan",
    initialState,
    reducers:{
        addApplication:(state,action)=>{
            state.applications.push(action.payload )
        },
        clearApplications:(state)=>{
            state.applications =[]
        }
    }
})



export const {addApplication,clearApplications} = loanslice.actions
export default loanslice.reducer