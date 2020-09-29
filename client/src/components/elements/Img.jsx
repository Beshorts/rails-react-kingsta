import React from 'react';

// reusable img component
const Img = (props) => {
  return(
    <img className="img-post" src={props.url} alt="beautiful whatever" />
  )
}
export default Img;
