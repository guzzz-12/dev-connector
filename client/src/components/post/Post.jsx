import React, {useEffect} from "react";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getSinglePost} from "../../actions/post";
import PostItem from "../posts/PostItem";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";

const Post = (props) => {
  useEffect(() => {
    props.getPost(props.match.params.postId)
  }, [props.getPost]);

  return (
    <React.Fragment>
      {props.loading && !props.post &&
        <Spinner />
      }

      {!props.loading && props.post &&
        <React.Fragment>
          <PostItem post={props.post} showActions={false}/>
          <CommentForm postId={props.post._id} />
          <Link to="/posts" className="btn">
            Back to Posts
          </Link>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state.postReducer.post,
    loading: state.postReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (postId) => {
      dispatch(getSinglePost(postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
