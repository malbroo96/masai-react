import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        values:{},
    }
    ,
    reducers: {
        setFormValues: (state, action) => {
            const{ name, value } = action.payload;
            state.values[name] = value;
        },
        resetForm: (state) => {
            state.values = {};
        },
    },
});
export const { updateField,resetForm } = formSlice.actions;
export default formSlice.reducer;
