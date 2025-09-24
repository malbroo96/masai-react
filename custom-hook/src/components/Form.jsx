import React from "react";
import useForm from "../hooks/useForm";


const Form = () => {
    const { values, handleChange, handleReset } = useForm();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', values);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="username"
                placeholder="Username"
                value={values.username || ''}
                onChange={handleChange}
                />
            <input 
                type="email"
                name="email"
                placeholder="Email"
                value={values.email || ''}
                onChange={handleChange}
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleReset}>Reset</button>
        </form>
    );
}
export default Form;