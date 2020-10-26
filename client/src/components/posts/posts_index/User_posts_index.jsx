import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';

import axios from 'axios';

import Img from '../../elements/Img';
import emptyPosts  from '../../images/emptyPosts.svg';

function UserPostsIndex(props) {

  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState('');
  const [noPost, setNoPost] = useState(false);
  const [error, setError] = useState(false);

  const { userId } = props.match.params

// posts are associated to his user through active record Collection Proxy
  useEffect(() => {

    let isSubscribed = true;

    axios.get(`/api/users/${userId}`)
    .then(response => {
      // isSubscribed => cleanup useEffect to avoid memory leaks
      if ((response.data.posts.length > 0) && isSubscribed) {
        setError(false);
        setNoPost(false);
        setPosts(response.data.posts);
        setImages(response.data.images);
        console.log(response.data);
        console.log(response.data.posts.length);
      } else if (response.data.posts.length === 0 ) {
          setNoPost(true);
      } else {
          setError(true);
      }
    })
    return () => isSubscribed = false;
  }, [setPosts, userId]);

// iterate through posts and images arrays and associate post to his image in a new array
let postWithImage = [];
for (let i = 0; i < posts.length; i++) {
  postWithImage.push({
    post: posts[i],
    image: images[i]
  });
}

console.log(postWithImage);
  // iterate through Posts array and get all posts from currentUser
  // on click image redirect to post details
  const postIndex =
    <div className="posts-index-board">
      {
        postWithImage.map(item =>
      ( <Link to={`/posts/${item.post.id}`} key={item.post.id} >
           <Img url={item.image} alt="amazing me"/>
        </Link> )
      )}
    </div>

  return(
    <div className="posts-response-container">
      <div className="posts-index ">
        {postIndex}
      </div>
      <div className="container no-posts-yet">
        {noPost &&
          <div className="row text-image-no-posts justify-content-center ">
            <div className="col-12 col-md-8 col-lg-6">
              <h4 className="no-posts-text mt-3" align="center">
                Any posts yet!
              </h4>
               <img src={emptyPosts} alt="any posts yet"/>
            </div>
          </div>
        }
      </div>
      <div className="errors col-12 mb-2">
        {error &&
          <h5 className="posts-index-error pl-3">
            Something went wrong!
          </h5>
        }
      </div>
    </div>
  )
}

export default UserPostsIndex;
