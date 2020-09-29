import React from 'react';

// import components
import PolicyForms from './Policy_forms';
import HeaderForms from './Header_forms';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// same layout for Login and Signup pages
const RegistrationsLayout = (props) => {
  return(
     <section className="registrations-layout">
       <header className="header-forms">
         <HeaderForms />
       </header>
       <div className=" forms-policy-container justify-content-lg-center mb-5">
          <main className="registration-forms-container">
            {props.children}
          </main>
          <footer className="policy-footer">
            <PolicyForms />
          </footer>
       </div>
    </section>
  );
}
export default RegistrationsLayout;
