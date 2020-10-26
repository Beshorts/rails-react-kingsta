import React, { useState, useEffect } from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';

import Img from '../../elements/Img';


const PostsSearched = (props) => {

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [images, setImages] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  // take query state stored in props location (navbar)
  let query = props.location.state;

  useEffect(() => {
    // if query blank show NotFound alert and do not api call
    (query === '') ? !setFilteredPosts([]) && setNotFound(true) :
      axios.get(`/api/search?query=${query}`)
      .then(response => {
        console.log(response)
        // store response data in a variable
        const posts = response.data.posts;

        // filter all posts based on query params include upperCase words
        const postsListFiltered = posts.filter(post => {
          return  post.description.toLowerCase().includes(query.toLowerCase())
        })
        // conditional response logic
        if (posts.length === 0)  {
          setNotFound(true);
          setImages('');
          setFilteredPosts([]);
        } else if (posts.length > 0) {
          setNotFound(false);
          setError(false);
          setImages(response.data.images)
          setFilteredPosts(postsListFiltered);
          console.log(postsListFiltered);
        } else {
         setError(true);
        }
      })
    }, [query, setFilteredPosts, setImages]);

// iterate through posts and images arrays and associate post to his image in a new array
let postWithImage = [];
for (let i = 0; i < filteredPosts.length; i++) {
  postWithImage.push({
    post: filteredPosts[i],
    image: images[i]
  });
}

console.log(postWithImage);

  // show posts who response to query parameters
  const searchResults =
      <div className="posts-index-board">
        {postWithImage.map(item =>
        ( <Link to={`/posts/${item.post.id}`} key={item.post.id} >
             <Img url={item.image} alt="amazing me" />
          </Link> )
        )}
      </div>

// count how many posts are found
let countPosts = null;
  if (filteredPosts.length === 1) {
    countPosts= <span className="count-pubblications ml-2">
                  {filteredPosts.length} post
                </span>
  } else {
    countPosts = <span className="count-pubblications ml-2">
                  {filteredPosts.length} posts
                </span>
  }

  return(
      <div className="container posts-response-index px-0">
       <div className="posts-searched-container">
         <div className="posts-index ">
          { !notFound ?
              <h6 className="header-post-searched">
                <span><strong>#{query}</strong></span>
                <span className="count-pubblications ml-2">
                {countPosts}
                </span>
              </h6>
            : null
          }
          {searchResults}
         </div>
       </div>
      <div className="errors col-12 mb-2 mt-5">
       {notFound &&
          <h5 className="posts-index-error pl-3 mt-5">
            No results for your search!
          </h5>
        }
      </div>
      <div className="errors col-12 mb-2 mt-5">
       {error &&
          <h5 className="posts-index-error pl-3 mt-5">
            Something went wrong!
          </h5>
        }
      </div>
    </div>
  )
}

export default PostsSearched;
