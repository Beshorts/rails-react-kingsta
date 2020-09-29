import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import axios from 'axios';

// import librairie for avatar
import Avatar from 'react-avatar';

// component for post random image
import ImagePost from '../Image_post';

// import element
import PostCard from '../../elements/post_card/Post_card';
import Button from '../../elements/button/Button';

function UserPost(props) {

  // set hooks initial state
  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState([]);
  const [user, setUser] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [postDestroy, setPostDestroy] = useState(false);
  const [error, setError] = useState(false);

  const {currentUser} = props;

  // show current post created
  useEffect(() => {

    const { postId } = props.match.params;

    axios.get(`/api/posts/${postId}`)
      .then(response => {
        setError(false);
        setPostId(response.data.post.user_id);
        setPost(response.data.post.description);
        setUser(response.data.user);
        console.log(response.data);
        console.log(response.data.post);
      }).catch((error) => {
         setError(true);
      })
    },[setUser, props.match.params, setPost]);

  // delete current post generated and redirect to currentUser profile
  const deletePost = () => {

    const { postId } = props.match.params;

    axios.delete(`/api/posts/${postId}`)
      .then(response => {
        setError(false)
        setPostDestroy(true);
        console.log(response)
        props.history.push(`/users/${user.id}`)
      }).catch((error ) => {
          setError(true);
      })
    };

  /* find hashtags inside post description and make it clickable,
     split string objects and keep space between */
  const descriptionHashTags = post.toString().split(/(\s+)/).map(word => {
    if (word.includes('#')) {
      // save word in location state to query all posts with same hashtag on search path
      const location = {
        pathname: '/search',
        state: word.replace('#','')
      }
      word = <Link key={word} to={location}>{word}</Link>
    }
    return word
  });

  // onClick redirect on currentUser profile
  const redirectPath = () => {
      props.history.push(`/users/${user.id}`);
  }

  // a random image will be attached through ImagePost component
  return(
    <div className="container post mb-5">
      <PostCard
        username={user.username}
        description={descriptionHashTags}
        avatar={ <Avatar size="40" round="50px" name={user.username}/>}
        images={ <ImagePost {...props} post={post} />}
        />
        {/* show buttons only if it's currentUser's post */}
        { currentUser.id === postId ?
          <div className="button-save-delete d-flex justify-content-center p-3">
            <Button
              theme="danger"
              type="delete"
              onClick={deletePost}
              className="btn btn-danger">
              delete
            </Button>
            <Button
              theme="primary"
              type="submit"
              onClick={redirectPath}
              className="btn btn-primary">
              profile
            </Button>
          </div>
          : null
        }
        {error &&
          <div className="post-error">
            Something went very very wrong!
          </div>
        }
    </div>
  )
}

export default UserPost;
