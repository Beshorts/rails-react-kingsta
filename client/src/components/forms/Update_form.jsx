import React, {useState} from 'react';

import axios from 'axios';


// import elements
import InputField from '../elements/Input_field';
import Button from '../elements/button/Button';
import useForm from '../elements/use_form';
import Loading from '../elements/loading/Loading';
import ErrorMessage from '../elements/errors/error_message/Error_message';

const UpdateForm = (props) => {

  const { values, setValues, handleChange, handleSubmit} = useForm({
    bio: "",
    city: "",
    avatar: null
  }, UpdateUser);

  // show error if post request failed
  const [error, setError] = useState(false);
  // show error if image is more than 2MB
  const [sizeError, setSizeError] = useState(false)
  // show error if a field is not filled
  const [inputEmpty, setInputEmpty] = useState(false)
  // show 'loading' when post request start
  const [loading, setLoading] = useState(false);

  function UpdateUser() {

  // use FormData to manage binary data file
  const formData = new FormData();

  /* avatar field has to be filled before submit data
     avatar size must be less or equal to 2MB */
  if (values.avatar && values.avatar.size <= 2097152) {
    formData.append('avatar', values.avatar)
  } else {
    setSizeError(true);
  }
  formData.append('bio', values.bio);
  formData.append('city', values.city);

  const {userId} = props.match.params

  // send post request if all fields are filled and avatar size is less than 2MB
  if (values.avatar && values.bio && values.city && values.avatar.size <= 2097152) {
    setInputEmpty(false);
    setSizeError(false);
    setError(false);
    setLoading(true);
    axios.patch(`/api/users/${userId}`, formData, {timeout: 15000, withCredentials: true})
      .then(response => {
        console.log(response.status);
        if (response.data.status === 'updated') {
          setValues(response.data);
          setLoading(false);
          setError(false);
          props.history.push(`/users/${userId}`);
        } else {
          setLoading(false);
          // show error on response failed
          setError(true);
        }
        console.log(values.avatar);
        console.log(response);
      })
    // catch error on request failed
    .catch(error => {
      setLoading(false);
      setError(true);
    });
    } else {
      setInputEmpty(true);
    };
  }; // close updateUser


  return (
    <div className="registration-forms-container mt-0">
      <div className="container container-form">
        <div className="row forms justify-content-center">
        { loading ? <Loading /> :
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
         }
         <div className="errors col-12 mb-2 mt-3">
           { sizeError &&
            <div className="form-error">
              <div className="alert alert-warning mt-3 "
                   role="alert">
                <p className=" alert-text mb-0" >
                  choose an image less than 2MB
                </p>
              </div>
            </div>
           }
           { inputEmpty &&
            <div className="form-error">
              <div className="alert alert-warning mt-3 "
                   role="alert">
                <p className=" alert-text mb-0" >
                  fields cannot be blank!
                </p>
              </div>
            </div>
           }
           { error ? <ErrorMessage /> : null }
          </div>
        </div>
      </div>
    </div>
  );
 }

export default UpdateForm;

