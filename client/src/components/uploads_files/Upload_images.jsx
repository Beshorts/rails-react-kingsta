import React, { Component, useState } from 'react'
import axios from 'axios';
import { DirectUpload } from 'activestorage';

// import elements
import InputField from '../elements/Input_field';

class UploadImages extends Component {
  constructor() {
    super();
    this.state = {
      avatar: {},
      preview: {}
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitting this form...')
    const {user} = this.props;

   const formData = new FormData();
   formData.append('avatar', this.state.avatar);

    axios.patch(`/api/users/${user.id}`, formData, {headers: {'content-Type': 'multipart/form-data'}}, {withCredentials: true})
    .then(data => {
      this.setState({
        preview: data.data.avatar})
      this.uploadFile(this.state.avatar, data);
      console.log(this.state.avatar);
      console.log(data);
      console.log(data.data.avatar);
    })

  }

  uploadFile = (file, user) => {
    const upload = new DirectUpload(file, '/api/rails/active_storage/direct_uploads')
    upload.create();
  }

render() {
  return(
      <form className="upload-images mt-5" onSubmit={this.handleSubmit} >
      <label className="mt-5">avatar</label>
      <InputField type='file' name='avatar' handleChange={this.handleOnChange} />
      <InputField type='submit' value="Add avatar"/>
      <img className="settings-avatar" src={this.state.preview} alt="bubu" />
      </form>

    )
}

};
export default UploadImages;
