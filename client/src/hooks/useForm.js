// client/src/hooks/useForm.js
import { useState } from 'react';

/**
 * @description Custom hook to manage form state and handle change events.
 * @param {object} initialValues - The initial state object for the form.
 * @returns {object} { values, handleChange, resetForm }
 */
const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChange,
        resetForm,
        setValues, // Include setValues for external control (e.g., form reset after submit)
    };
};

export default useForm;