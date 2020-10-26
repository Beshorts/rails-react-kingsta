
import React, { useState } from 'react';

import axios from 'axios';

// import custom Hook for registrations forms
import useForm from '../elements/use_form';

// import elements
import InputField from '../elements/Input_field';
import Button from '../elements/button/Button';

const CreatePost = (props) => {

  const { values,setValues, handleChange, handleSubmit } = useForm({
    description: "",
    user_id: props.user.id,
    image: null
  }, SubmitPost);

  const [errors, setErrors] = useState(null);
  const [sizeError, setSizeError] = useState(false)
    // see image loading start
  const [loading, setLoading] = useState(false);

  // create a new post with a description(required)
  function SubmitPost() {

    const formData = new FormData();

    // image size must be less or equal to 2MB
    if ( values.image.size <= 2097152 ) {

      formData.append('image', values.image);
    } else {
      setSizeError(true);
    }
      formData.append('user_id', props.user.id);

      if (values.description.length === 0) {
        setSizeError(true);
      } else {
      formData.append('description', values.description);
      }


    axios.post('/api/posts', formData, {headers: {'content-Type': 'multipart/form-data'}}, {withCredentials: true} )
      .then(   setSizeError(false) ? setLoading(true) : setLoading(false))
      .then(response => {
        if (response.data.status === 'created') {
        //props.history.push(`/posts/${response.data.post.id}`);
        setLoading(false);
        setErrors(false);
        setValues(response.data);
        console.log(response.data.errors);
        } else {
          setLoading(false)
          setErrors(response.data.errors);
        }
        console.log(response.data.image);
        console.log(response.data)
    })
      .catch(error => {
       console.log(error);
    })
  }; // close submitPost


    return (
    <div className="registration-forms-container mt-0">
      <div className="container container-form">
        <div className="row forms justify-content-center">
        { loading ? <div className="loading-start mt-5" >
          <h3 className="loading-text mt-5 pt-5">loading...</h3>
          </div>
          :
          <form  className="registration-form col-12 col-lg-8 mt-5" >
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
                  <p className="suggestion-text ml-2 mb-0 pb-0">*max 2MB / jpeg or png </p>
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
                    description
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
           <div className="errors col-12 mb-2">
             { sizeError &&
              <div className="form-error">
                <div className="alert alert-warning mt-3 "
                     role="alert"
                     key={sizeError}>
                  <p className=" alert-text mb-0" >
                    image must be less than 2MB
                  </p>
                </div>
              </div>
             }
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
    </div>
  )
}

export default CreatePost;
