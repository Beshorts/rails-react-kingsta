import React, { useState, useEffect } from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';

// import elements
import Img from '../../elements/Img';
import Loading from '../../elements/loading/Loading';
import ErrorMessage from '../../elements/errors/error_message/Error_message';

const PostsSearched = (props) => {

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  // take query state stored in props location by navbar search
  let query = props.location.state;

  useEffect(() => {
    // if query blank, show NotFound and do not make api call
    (query === '') ? !setFilteredPosts([]) && setNotFound(true) :
    (async () => {
      try {
        setLoading(true);
        setNotFound(false);
        setError(false);
        const response = await  axios.get(`/api/search?query=${query}`)
          // store response data in a variable
          const posts = response.data.posts;
          // filter all posts based on query params include upperCase words
          const postsListFiltered = posts.filter(post => {
            return  post.description.toLowerCase().includes(query.toLowerCase())
        });
        // conditional response logic
        if (posts.length > 0) {
          setFilteredPosts(postsListFiltered);
          setImages(response.data.images)
          setNotFound(false);
          setError(false);
          setLoading(false);
          console.log(postsListFiltered);
        } else if (posts.length === 0)  {
          setImages('');
          setFilteredPosts([]);
          setNotFound(true);
          setLoading(false);
        } else {
          setError(true);
          setImages([]);
          setLoading(false);
          setNotFound(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        setNotFound(false);
      }
    })();
  }, [query]);

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

  // logic to show the count of posts searched
  let countPosts = null;

  if (filteredPosts.length === 0) {
    countPosts = null;
  } else if (filteredPosts.length === 1) {
    countPosts= <h6 className="header-post-searched">
                  <span>
                    <strong>#{query}</strong>
                  </span>
                  <span className="count-pubblications ml-2">
                    {filteredPosts.length} post
                  </span>
                </h6>
  } else {
    countPosts = <h6 className="header-post-searched">
                   <span>
                     <strong>#{query}</strong>
                   </span>
                   <span className="count-pubblications ml-2">
                     {filteredPosts.length} posts
                   </span>
                 </h6>
  }

  // logic to show correct view based on search
  let searchContainer = null;

  if (loading) {
    searchContainer = <Loading />
  } else if (error) {
    searchContainer = <div className="posts-searched-container">
                        <ErrorMessage />
                      </div>
  } else if (notFound) {
    searchContainer = <div className="posts-searched-container">
                        <h5 className="posts-index-not-found">
                          No results for your search!
                        </h5>
                      </div>
  } else {
    searchContainer = <div className="posts-searched-container">
                        {countPosts}
                        {searchResults}
                      </div>
  }

  return(
    <div className="container posts-response-index px-0">
        {searchContainer}
    </div>
  )
}

export default PostsSearched;
