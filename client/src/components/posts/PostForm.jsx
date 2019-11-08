import React, {useState} from "react";
import {connect} from "react-redux";
import {createPosts} from "../../actions/post";

const PostForm = (props) => {
  const [text, setText] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.addPost(text);
    setText("")
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Create post</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add post content..."
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
    addPost: (text) => {
      dispatch(createPosts(text))
    }
  }
}

export default connect(null, mapDispatchToProps)(PostForm);
