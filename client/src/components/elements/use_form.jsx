import { useState } from 'react';

// create custom Hook
const useForm = (initialValues, callback) => {

  const [values, setValues] = useState(initialValues);
/* callback is the function passed in custom Hook form component (SignupSubmit)
and will be call whenever the form submits */
  const handleSubmit = (event) => {
    if (event)
      event.preventDefault();
      callback();
  };

// function handles input changes
  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

// returns functions to be accessible from component SignupForm and LoginForm
  return {
    handleChange,
    handleSubmit,
    values,
    setValues
  }
};

export default useForm;
