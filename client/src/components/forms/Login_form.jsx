import React, { useState, useContext } from 'react';

import axios from 'axios';

// import initialized context
import UserLogContext from '../../contexts/UserLogContext';

import { Link } from 'react-router-dom';


// import elements
import InputField from '../elements/Input_field';
import Button from '../elements/button/Button';
import useForm from '../elements/use_form';

const LoginForm = (props) => {

 const {handleLogin} = useContext(UserLogContext);
   // set initial state for user's keys
   const { values, handleChange, handleSubmit } = useForm({
     username: "",
     email: "",
     password: "",
   }, LoginSubmit);

  const [errors, setErrors] = useState(false);

/* the values have to match handleLogin datas function create on App.js
   then redirect on his profile page */
  function LoginSubmit() {

    let user = {
      username: values.username,
      email: values.email,
      password: values.password
    }

    axios.post('/api/login', {user}, {withCredentials: true})
    .then((response) => {
      if (response.data.logged_in) {
        // store data in localStorage to keep user login session on reload page
        localStorage.setItem('userSession', JSON.stringify(response.data.logged_in));
        localStorage.setItem('currentUser', JSON.stringify({user: {id: response.data.user.id, username: response.data.user.username}}));
        handleLogin(response.data);
        props.history.push(`/users/${response.data.user.id}`);
      } else {
        setErrors(response.data.errors);
      }
    })
  };

  return (
    <div className="container container-form">
      <div className="row forms">
        <form onSubmit={handleSubmit} className="registration-form col-12">
          <div className="container-fluid form-header d-md-flex">
            <div className="container-title-link mr-auto d-flex justify-content-between align-items-center">
            <h3 className="form-title align-self-center">
              login
            </h3>
              <Link to='/signup' className="container-link align-self-center">
                <p className="go-to-link align-self-center">
                  or sign up
                </p>
              </Link>
            </div>
            <p className="forgot-password align-self-center mb-0">forgot your password?</p>
          </div>
          <div className="form-all-inputs">
            <div className="form-group">
              <label className="input-username my-0">
                <p className="input-title mb-1 mt-3">
                  username
                </p>
              </label>
              <InputField
                className="form-control"
                type="text"
                name="username"
                autoComplete="username"
                placeholder=""
                value={values.username}
                handleChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="input-email my-0">
                <p className="input-title mb-1 mt-3">
                  email
                </p>
              </label>
              <InputField
                className="form-control"
                type="text"
                name="email"
                autoComplete="email"
                placeholder=""
                value={values.email}
                handleChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="input-password my-0">
                <p className="input-title mb-1 mt-3">
                  password
                </p>
              </label>
              <InputField
                className="form-control"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder=""
                value={values.password}
                handleChange={handleChange}
                required
              />
            </div>
            <div className="form-check">
              <InputField type="checkbox" className="form-check-input"/>
                 <label className="form-check-label">
                   remember me
                 </label>
            </div>
            <div className="btn-container d-flex justify-content-end">
              <Button
                theme="primary"
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary">
                login
              </Button>
            </div>
          </div>
        </form>
        <div className="errors col-12 mb-2 mt-3">
          {errors &&
           <div className="form-error">{errors.map((error) => {
            return  <div className="alert alert-warning"
                       role="alert"
                       key={error}
                    >
                    <p className=" alert-text mb-0" >
                      {error}
                    </p>
                  </div>
                })
              }
           </div>
          }
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
