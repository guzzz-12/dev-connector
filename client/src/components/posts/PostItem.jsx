import React from "react";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {connect} from "react-redux";

const PostItem = (props) => {
  const {_id, text, name, avatar, user, likes, comments, date} = props.post;

  return (
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
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          {" "}<span>{likes.length}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion{" "}<span className='comment-count'>{comments.length}</span>
        </Link>
        {props.auth.isAuthenticated && props.auth.user._id === user && 
          <button      
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>        
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer
  }
}

export default connect(mapStateToProps)(PostItem);
