import React, {useState} from "react";
import {connect} from "react-redux";
import {addComment} from "../../actions/post";

const CommentForm = (props) => {
  const [text, setText] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.addComment(props.postId, text);
    setText("")
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        >
        </textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (postId, text) => {
      dispatch(addComment(postId, text))
    }
  }
}

export default connect(null, mapDispatchToProps)(CommentForm);
