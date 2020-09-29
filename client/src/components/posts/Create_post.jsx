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
    user_id: props.user.id
  }, SubmitPost);

  const [error, setError] = useState(false);

  // create a new post with a description(required)
  function SubmitPost() {

    let post = {
      description: values.description,
      user_id: props.user.id,
    }

    axios.post('/api/posts', post)
      .then(response => {
      if (response.data.status === 'created') {
        setError(false);
        setValues(response.data);
        console.log(response.data)
        props.history.push(`/posts/${response.data.post.id}`);
      } else {
         setError(true);
      }
    })
  };

  return (
     <div className="registration-forms-container mt-0">
      <div className="container container-form">
        <div className="row forms justify-content-center">
          <form onSubmit={handleSubmit}  className="registration-form col-12 col-lg-8 mt-5">
            <div className="container-fluid form-header d-md-flex mt-5">
              <div className="container-title-link mr-auto d-flex justify-content-between mt-5">
              <h3 className="form-title align-self-center">
                create a new post
              </h3>
              </div>
            </div>
            <div className="form-all-inputs">
              <div className="form-group">
                <label className="input-username my-0">
                  <p className="input-title mb-1 mt-3">
                    description
                  </p>
                  <p className="suggestion-text mb-0">*a random image will be attached</p>
                </label>
                <InputField
                  className="form-control"
                  type="text"
                  name="description"
                  autoComplete="description"
                  placeholder=""
                  value={values.description ||""}
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
  )
}
export default CreatePost;
