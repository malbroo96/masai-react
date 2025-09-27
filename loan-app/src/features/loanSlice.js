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
        clearApplication:(state)=>{
            state.applications =[]
        }
    }
})



export const {addApplication,clearApplication} = loanslice.actions
export default loanslice.reducer