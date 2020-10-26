import React from 'react';

// reusable img component
const Img = (props) => {
  return(
    <img className={props.className} src={props.url} alt={props.alt} />
  )
}
export default Img;
