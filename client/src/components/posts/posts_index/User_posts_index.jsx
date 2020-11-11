import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

// import context
import UserProfileContext from '../../../contexts/UserProfileContext';

// import images
import Img from '../../elements/Img';
import emptyPosts  from '../../images/emptyPosts.svg';


function UserPostsIndex(props, match) {

  // consume context
  const {posts, images} = useContext(UserProfileContext);

  // iterate through posts and images arrays and associate image to his post in a new array
  let postWithImage = [];
  for (let i = 0; i < posts.length; i++) {
    postWithImage.push({
      post: posts[i],
      image: images[i]
    });
  }

  console.log(postWithImage);

  /* iterate through Posts array and get all posts from currentUser
     on click image redirect to current post details */
  const postIndex =
    <div className="posts-index-board">
      {
        postWithImage.map(item =>
      ( <Link to={`/posts/${item.post.id}`} key={item.post.id} >
           <Img url={item.image} alt="amazing me"/>
        </Link> )
      )}
    </div>

  // logic to display posts gallery or empty gallery image
  let postsContainer = null;

  if (postWithImage.length > 0) {
    postsContainer = <div className="posts-index ">
                       {postIndex}
                     </div>
  } else {
    postsContainer = <div className="container no-posts-yet">
                       <div className="row text-image-no-posts justify-content-center ">
                         <div className="col-12 col-md-8 col-lg-6">
                           <h4 className="no-posts-text mt-3" align="center">
                             Any posts yet!
                           </h4>
                           <img src={emptyPosts} alt="any posts yet"/>
                         </div>
                       </div>
                     </div>
  }

  return(
    <section className="container user-posts-index px-0 mt-3 mb-5">
        {postsContainer}
    </section>
  );
}

export default UserPostsIndex;
