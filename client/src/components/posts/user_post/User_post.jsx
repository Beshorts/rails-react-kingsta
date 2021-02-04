import React, {useState, useEffect, useContext} from 'react';

import axios from 'axios';

import {Link} from 'react-router-dom';

// import context
import UserLogContext from '../../../contexts/UserLogContext';

// import element
import Img from '../../elements/Img';
import PostCard from '../../elements/post_card/Post_card';
import Button from '../../elements/button/Button';
import Loading from '../../elements/loading/Loading';
import ErrorMessage from '../../elements/errors/error_message/Error_message';

function UserPost(props) {

  // consume context
  const {currentUser} = useContext(UserLogContext);

  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState('');
  const [image, setImage] = useState('');
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [postDestroy, setPostDestroy] = useState(false);
  const [error, setError] = useState(false);


  // show current post created or clicked
   const getUserPost = async () => {
   const { postId } = props.match.params;
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`/api/posts/${postId}`,{post}, {withCredentials: true})
        setAvatar(response.data.avatar);
        setImage(response.data.image);
        setPost(response.data.post.description);
        setPostId(response.data.post.user_id);
        setUser(response.data.user);
        setError(false);
        setLoading(false);
      } catch (error) {
         setError(true);
         setLoading(false);
      }
    }
  useEffect(() => {
    getUserPost();
    },[]);

  // delete current post generated and redirect to currentUser profile
  const deletePost = () => {
    const { postId } = props.match.params;
    axios.delete(`/api/posts/${postId}`)
    .then(response => {
      setError(false)
      setPostDestroy(true);
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

  // logic to show correct view
  let postContainer = null;

  if (error) {
    postContainer = <div className="container post mb-5">
                      <ErrorMessage />
                    </div>
  } else if (loading) {
    postContainer = <Loading />
  } else {
    postContainer = <div className="container post mb-5">
                      <PostCard
                        username={user.username}
                        description={descriptionHashTags}
                        avatar={ <Img className="user-avatar" url={avatar} alt="amazing me" />}
                        images={ <Img className="image-post" url={image} alt="amazing you"/>}
                      />
                      {/* show buttons only if it's currentUser's post */}
                      {currentUser.id === postId ?
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
                    </div>
  }

  return(
    <section className="post-created">
      {postContainer}
    </section>
  )
}

export default UserPost;
