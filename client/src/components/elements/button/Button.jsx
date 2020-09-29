import React from 'react';

 // reusable btn bootstrap component - see scss file for customization
const Button = (props) => {
  return(
    <button
      className={ "btn btn-" + props.theme}
      type={props.type}
      onClick={props.onClick} >{props.children}
    </button>
  )
}

export default Button;
