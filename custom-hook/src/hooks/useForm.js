import{ useDispatch, useSelector } from 'react-redux';
import {updateField,resetForm}from"../slices/formSlice";



const useForm = () => {
    const dispatch = useDispatch();
    const formValues = useSelector((state) => state.form.values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateField({ name, value }));
    }
    const handleReset = () => {
        dispatch(resetForm());
    }
    return {values: formValues, handleChange, handleReset};
}
export default useForm;