import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {connect} from "react-redux";
import {addLikes, removeLikes, deletePost} from "../../actions/post";
import Modal from "../confirm-modal/Modal";

const PostItem = (props) => {
  const {_id, text, name, avatar, user, likes, comments, date} = props.post;

  const [toggleModal, setToggleModal] = useState(false);

  const toggleModalHandler = (val) => {
    setToggleModal(val)
  }

  const deletePostHandler = () => {
    props.deletePost(_id);
  }

  const [isLiked, setIsLiked] = useState(false);

  //Actualizar el state al montar el componente y al cambiar el número de likes
  useEffect(() => {
    //Tomar las id's de los usuarios que dieron like
    const postLikes = props.post && props.post.likes.map(like => like.user);  

    //Chequear si el usuario dio like al post 
    const checkIfLiked = props.auth.user ? postLikes.includes(props.auth.user._id) : false;

    //Actualizar el state
    if (checkIfLiked) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
    // eslint-disable-next-line
  }, [props.auth.user, likes]);

  return (
    <React.Fragment>
      <Modal
        show={toggleModal}
        toggleModal={toggleModalHandler}
        action={deletePostHandler}
        actionName="deletePost"
        id={_id}
      />
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profiles/user/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt={name}
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          {date && 
            <p className="post-date">
              Posted on {format(new Date(date), "yyyy-MM-dd")}
            </p>        
          }
          {props.showActions &&
            <React.Fragment>
              <button
                type="button"
                id="addLikeBtn"
                className="btn btn-light"
                onClick={() => props.addLike(_id)}
                disabled={isLiked}
              >
                <i className="fas fa-thumbs-up"></i>
                {" "}<span>{likes.length}</span>
              </button>
              <button 
                type="button"
                id="addLikeBtn"
                className="btn btn-light"
                onClick={() => props.removeLike(_id)}
                disabled={!isLiked}
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}<span className='comment-count'>{comments.length}</span>
              </Link>
              {props.auth.isAuthenticated && props.auth.user._id === user && 
                <button      
                  type="button"
                  className="btn btn-danger"
                  title="Delete post"
                  onClick={() => toggleModalHandler(true)}
                >
                  <i className="fas fa-times"></i>
                </button>        
              }
            </React.Fragment>
          }
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (postId) => {
      dispatch(addLikes(postId))
    },
    removeLike: (postId) => {
      dispatch(removeLikes(postId))
    },
    deletePost: (postId) => {
      dispatch(deletePost(postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
