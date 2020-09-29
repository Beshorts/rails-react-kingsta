import React from 'react';

import { Link } from 'react-router-dom';

import Signup  from '../../images/signup.svg';


const PolicyForms = () => {

  return(
    <footer className="container policy-text-draw">
      <div className="policy-text">
        <p>
          <strong>Lorem ipsum</strong>
          <br />
            samet, consectetur adipiscing elit.
            In viverra sapien pharetra, amet at
            quisque bibendum. samet, consectetur
            adipiscing elit.
          <br />
          <Link to="" className="learn-more">
            learn more
          </Link>
        </p>
      </div>
      <div className="forms-image">
        <img src={Signup} alt="signup draw" />
      </div>
    </footer>
  )
}

export default PolicyForms;
