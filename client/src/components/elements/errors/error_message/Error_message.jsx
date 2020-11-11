import React from 'react';

const ErrorMessage = () => {
  return(
   <section className="form-error">
     <div className="alert alert-danger mt-3 "
          role="alert">
       <p className=" alert-text mb-0" >
         something went wrong! Please try again
       </p>
     </div>
   </section>
  )
}
export default ErrorMessage;
