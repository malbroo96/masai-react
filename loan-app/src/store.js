import {cofigureStore} from "@reduxjs/toolkit"
import loanReducer from "./features/loanSlice"

export const store = configureStore({
    reducer:{
        loan:loanReducer,
    }
})