import { useState } from 'react';

// Custom hook to manage form state
const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    // Handles input changes for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Helper to reset the form state
    const reset = () => {
        setValues(initialState);
    };

    // We use a default export here to match your import statement:
    // import useForm from "../../hooks/useForm";
    return [values, handleChange, reset, setValues];
};

export default useForm;