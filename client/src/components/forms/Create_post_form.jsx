
import React, { useState, useContext } from 'react';

import axios from 'axios';

import UserLogContext from '../../contexts/UserLogContext';

// import custom Hook for registrations forms
import useForm from '../elements/use_form';

// import elements
import InputField from '../elements/Input_field';
import Button from '../elements/button/Button';
import Loading from '../elements/loading/Loading';
import ErrorMessage from '../elements/errors/error_message/Error_message';

const CreatePost = (props) => {

  const {currentUser } = useContext(UserLogContext);

  const { values, setValues, handleChange, handleSubmit } = useForm({
    description: "",
    user_id: currentUser.id,
    image: null
  }, SubmitPost);

  // show error if post request failed
  const [error, setError] = useState(false);
  // show error if image is more than 2MB
  const [sizeError, setSizeError] = useState(false)
  // show error if a field is not filled
  const [inputEmpty, setInputEmpty] = useState(false)
  // show 'loading' when post request start
  const [loading, setLoading] = useState(false);

  function SubmitPost() {

  // use FormData to send binary data file
  const formData = new FormData();

  // allow only jpg (or jepg) and png as file extension
  const imageFormat = /\.(jpe?g|png)$/i;

  /* image field has to be filled before submit data
     to apply rules as image size must be less or equal to 2MB
     and file format jpg/png */
  if ( values.image && values.image.size <= 2097152 && (imageFormat.test(values.image.name)) ) {
    console.log(values.image);
    formData.append('image', values.image);
  } else {
    setSizeError(true);
  }
  formData.append('post[user_id]', currentUser.id);
  formData.append('post[description]', values.description);

  // send post request if all fields are filled and image size is less than 2MB and file format jpg/png
  if (values.image && values.description && values.image.size <= 2097152 && (imageFormat.test(values.image.name)) ) {
    setInputEmpty(false);
    setSizeError(false);
    setError(false);
    setLoading(true);
    axios.post('/api/posts', formData, {headers: {'content-Type': 'multipart/form-data'}}, {timeout: 15000, withCredentials: true} )
      .then(response => {
        if (response.data.status === 'created') {
          setValues(response.data);
          setLoading(false);
          setError(false);
          props.history.push(`/posts/${response.data.post.id}`);
        } else  {
          setLoading(false);
          // show error on response failed
          setError(true);
        }
        console.log(response.data.image);
        console.log(response.data)
      })
    // catch error on request failed
    .catch (() => {
      setLoading(false);
      setError(true);
    });
    } else {
      setInputEmpty(true);
    };
  }; // close submitPost

  return (
    <div className="registration-forms-container mt-0">
      <div className="container container-form">
        <div className="row forms justify-content-center">
        { loading ? <Loading /> :
          <form className="registration-form col-12 col-lg-8 mt-5" >
            <div className="container-fluid form-header d-md-flex mt-5">
              <div className="container-title-link mr-auto d-flex justify-content-between mt-5">
                <h3 className="form-title align-self-center">
                  create a new post
                </h3>
              </div>
            </div>
            <div className="form-all-inputs">
              <div className="form-group mb-0">
                <label className="input-username d-inline-flex mb-2">
                  <p className="input-title mb-0">
                    image
                  </p>
                  <p className="suggestion-text ml-2 mb-0 pb-0">
                    *max 2MB / jpg or png
                  </p>
                </label>
                <InputField
                  type='file'
                  name='image'
                  handleChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="input-username my-0">
                  <p className="input-title mb-1 mt-3">
                    description - hashtags
                  </p>
                </label>
                <InputField
                  className="form-control"
                  type="text"
                  name="description"
                  autoComplete="description"
                  placeholder=""
                  value={values.description ||""}
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
                  image has to be less than 2MB - format jpg or png
                </p>
              </div>
            </div>
           }
           { inputEmpty &&
            <div className="form-error">
              <div className="alert alert-warning mt-3 "
                   role="alert"
                   key={inputEmpty}>
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
  )
}

export default CreatePost;
