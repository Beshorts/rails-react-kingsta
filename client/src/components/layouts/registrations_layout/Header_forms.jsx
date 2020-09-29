import React from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderForms = () => {
  return(
      <nav className="container form-header-navigation fixed-top col-12 pt-4 pb-2 ">
        <Link to='/' className="back-link ">
          <FontAwesomeIcon className="link-icon-back" icon="arrow-left"/>
        </Link>
        <div className="logo-brand">
          <span className="logo-brand-1">K</span>
          <span className="logo-brand-2">insta</span>
        </div>
      </nav>
  )
}

export default HeaderForms;
