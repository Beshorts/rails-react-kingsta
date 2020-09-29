import React, { useState, useEffect } from 'react';

import axios from 'axios';
// import element
import Img from '../elements/Img';

const ImagePost = (props) => {

  const [imageSrc, setImageSrc] = useState();
  const [error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const { post } = props;

  useEffect(() => {
    let isSubscribed = true;
  // add sig= at the end of the API to avoid same random images when iterate on Posts Index
    axios.get(`https://source.unsplash.com/collection/1103088?sig=${post.id}`,  { headers: {
    "Access-Control-Allow-Origin": "*"}})
      .then(response => {
        // cleanup useEffect to avoid memory leaks
        if (isSubscribed) {
        setLoading(true);
        setError(false);
        setImageSrc(response.request.responseURL);
        console.log(response.request.responseURL);
       }
      })
      .catch((error) => {
        setError(true);
      })
      setLoading(false);
      return () => isSubscribed = false;
  }, [setImageSrc, post.id]);

// add logic to handle api errors and loading image
let imageContainer = null;

// style alert messages
const redAlert = { color: 'red'};
const greenAlert = { color: 'green'};

  if (error) {
   imageContainer =  <h5 className="image-error pl-3"
                         style={redAlert} >
                         some error occurred, while uploading image
                     </h5>
   } else if (!imageSrc) {
     imageContainer =  <h5 className="loading-image pl-3"
                           style={greenAlert} >
                           Loading image...
                       </h5>
   } else {
     imageContainer = <Img url={imageSrc} alt="amazing image from unsplash"/>
  }

  return(
    <div className="random-image-post">
      {imageContainer}
    </div>
  )
}

export default ImagePost;
