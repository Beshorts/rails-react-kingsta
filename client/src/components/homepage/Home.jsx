import React from 'react';

import {Link} from 'react-router-dom';

import Homepage  from '../images/homepage.svg';

const Home = () => {

return (
    <section className="homepage">
      <div className=" container home-actions">
        <div className="homepage-image">
          <img src={Homepage} alt="homepage draw" />
        </div>
        <div className="body-homepage-elements">
          <header className=" homepage-logo logo-brand">
            <span className=" logo-brand-1">K</span>
            <span className=" logo-brand-2">insta</span>
          </header>
          <main className="homepage-text">
            <p className="paragraph mb-0">signup and create your <strong>user profile
            </strong>, login logout, write <strong>posts</strong>,
            search by <strong>hastags</strong>, delete.
            </p>
          </main>
          <Link to='/signup'>
            <button type="submit" className="btn btn-info">SIGN UP</button>
          </Link>
          <nav className="homepage-link-forms">
            <Link to='/login' className="container-link">
              <p className="go-to-link mb-0">
                or signin
              </p>
            </Link>
            <p className="forgot-password mb-0">
              forgot your password?
            </p>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Home;
