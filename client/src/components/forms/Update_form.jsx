import React, {useState} from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import custom Hook for signup and login forms
import useForm from '../elements/use_form';

// import elements
import InputField from '../elements/Input_field';
import Button from '../elements/button/Button';
import Img from '../elements/Img';

const UpdateForm = (props) => {
  const { values, setValues, handleChange, handleSubmit} = useForm({
    bio: "",
    city: "",
    avatar: null
    }, UpdateUser);

  // custom hooks to display error, preview image and loading state
  const [error, setError] = useState(false);
  // see image loading start
  const [loading, setLoading] = useState(false);

   function UpdateUser() {

   const formData = new FormData();
   formData.append('bio', values.bio);
   formData.append('city', values.city);
   formData.append('avatar', values.avatar)

    const {userId} = props.match.params
    axios.patch(`/api/users/${userId}`, formData, {withCredentials: true})
    .then((response) => {
       //setValues({bio: response.data.user.bio, city: response.data.user.city, avatar: response.data.avatar});
      console.log(values.avatar);
      console.log(response);
      props.history.push(`/users/${userId}`);
    })
    .catch(error => console.log('error', error));
  }


  return (
    <div className="registration-forms-container mt-0">
      <div className="container container-form">
        <div className="row forms justify-content-center">
          <form className="registration-form col-12 col-lg-8 mt-5">
            <div className="container-fluid form-header d-md-flex mt-5 ">
              <div className="container-title-link mr-auto d-flex justify-content-between mt-5">
              <h3 className="form-title align-self-center">
                update your profile
              </h3>
              </div>
            </div>
            <div className="form-all-inputs">
              <div className="form-group mb-0">
                <label className="input-username d-inline-flex mb-2">
                  <p className="input-title mb-0">
                    avatar
                  </p>
                  <p className="suggestion-text ml-2 mb-0 pb-0">*max 2MB / jpeg or png </p>
                </label>
                <InputField
                  type='file'
                  name='avatar'
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
            <div className="btn-container d-flex justify-content-end">
                <Button
                  theme="primary"
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary">
                  create
                </Button>
              </div>
            </div>
          </form>
           <div className="errors col-12 mb-2">
             {error &&
              <div className="form-error">
                <div className="alert alert-warning"
                     role="alert"
                     key={error}>
                  <p className=" alert-text mb-0" >
                    description cannot be blank
                  </p>
                </div>
              </div>
             }
          </div>
        </div>
      </div>
    </div>
  );
 }

export default UpdateForm;

