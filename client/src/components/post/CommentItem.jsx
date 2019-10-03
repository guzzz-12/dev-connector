import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {deleteComment} from "../../actions/post";
import Modal from "../confirm-modal/Modal";

const CommentItem = (props) => {
  const {_id, text, name, avatar, user, date} = props.comment;

  const [toggleModal, setToggleModal] = useState(false);

  const toggleModalHandler = (val) => {
    setToggleModal(val)
  }

  const deleteCommentHandler = () => {
    props.deleteComment(props.postId, _id);
  }

  return (
    <React.Fragment>
      <Modal
        show={toggleModal}
        toggleModal={toggleModalHandler}
        action={deleteCommentHandler}
        actionName="deleteComment"
        id={_id}
      />
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profiles/user/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt={`${name} avatar`}
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
          <p className="post-date">
            Posted on {format(new Date(date), "yyyy-MM-dd")}
          </p>

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
    deleteComment: (postId, commentId) => {
      dispatch(deleteComment(postId, commentId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
