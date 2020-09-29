import React, {useState} from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';

// import custom Hook for registration forms
import useForm from '../elements/use_form';

// import elements
import InputField from '../elements/Input_field';
import Button from '../elements/button/Button';

const SignupForm = (props) => {

  // set initial state for user's keys
  const { values, handleChange, handleSubmit} = useForm({
    username: "",
    email: "",
    bio: "",
    city: "",
    password: "",
    password_confirmation: "",
  }, SignupSubmit);

  const [errors, setErrors] = useState(false);

  // add values to user's keys
  function SignupSubmit() {

    let user = {
      username: values.username,
      email: values.email,
      bio: values.bio,
      city: values.city,
      password: values.password,
      password_confirmation: values.password_confirmation,
    }

    // store data in localStorage to keep user login session on reload page
    axios.post('/api/users', {user}, {withCredentials: true})
    .then(response =>  {
      if (response.data.status === 'created') {
        localStorage.setItem('userSession', 'true');
        localStorage.setItem('currentUser', JSON.stringify({user: {id: response.data.user.id, username: response.data.user.username}}));
        props.handleLogin(response.data);
        console.log(response.data.user);
        props.history.push(`/users/${response.data.user.id}`);
      } else  {
        setErrors(response.data.errors);
       console.log(response.data.errors);
      }
    })
  };

  return (
    <div className="container container-form">
      <div className="row forms">
        <form onSubmit={handleSubmit} className="registration-form col-12">
          <div className="container-fluid form-header d-md-flex ">
            <div className="container-title-link mr-auto d-flex justify-content-between">
            <h3 className="form-title align-self-center">
              signup
            </h3>
              <Link to='/login' className="container-link align-self-center">
                <p className="go-to-link">
                  or login
                </p>
              </Link>
            </div>
              <p className="forgot-password align-self-center mb-0">
                forgot your password?
              </p>
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
              />
            </div>
            <div className="form-group">
              <label className="input-email d-flex justify-content-between my-0">
                <p className="input-title mb-1 mt-3">
                  email
                </p>
                <p className="suggestion-text mb-0 align-self-end">
                  example@email.com
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
              />
            </div>
             <div className="form-group">
                <label className="input-password d-flex justify-content-between my-0">
                  <p className="input-title mb-1 mt-3">
                    bio
                  </p>
                  <p className="suggestion-text mb-0 align-self-end">
                    (example: writer / dreamer)
                  </p>
                </label>
                <InputField
                  className="form-control"
                  type="text"
                  name="bio"
                  autoComplete="bio"
                  placeholder=""
                  value={values.bio || ''}
                  handleChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="input-password my-0">
                  <p className="input-title mb-1 mt-3">
                    city
                  </p>
                </label>
                <InputField
                  className="form-control"
                  type="text"
                  name="city"
                  autoComplete="city"
                  placeholder=""
                  value={values.city || ''}
                  handleChange={handleChange}
                />
              </div>
            <div className="form-group">
              <label className="input-password d-flex justify-content-between my-0">
                <p className="input-title mb-1 mt-3">
                  password
                </p>
                <p className="suggestion-text mb-0 align-self-end">
                  (4 minimum characters)
                </p>
              </label>
              <InputField
                className="form-control"
                type="password"
                name="password"
                autoComplete=""
                placeholder=""
                value={values.password}
                handleChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="input-password my-0">
                <p className="input-title mb-1 mt-3">
                  confirm password
                </p>
              </label>
              <InputField
                className="form-control"
                type="password"
                name="password_confirmation"
                autoComplete="password_confirmation"
                placeholder=""
                value={values.password_confirmation}
                handleChange={handleChange}
                required
              />
            </div>
            <div className="btn-container d-flex justify-content-end">
              <Button
                theme="primary"
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary">
                create profile
              </Button>
            </div>
          </div>
        </form>
        <div className="errors col-12 mb-2">
          {errors && <div className="form-error">{errors.map((error) => {
            return <div className="alert alert-warning"
                        role="alert"
                        key={error}>
                     <p className=" alert-text mb-0" >{error}</p>
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

export default SignupForm;
