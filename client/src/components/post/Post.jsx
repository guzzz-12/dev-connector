import React, {useEffect} from "react";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getSinglePost} from "../../actions/post";
import PostItem from "../posts/PostItem";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = (props) => {
  useEffect(() => {
    props.getPost(props.match.params.postId)
  }, [props.getPost]);

  return (
    <React.Fragment>
      {props.loading && !props.post &&
        <Spinner />
      }

      {props.postError && (
          <React.Fragment>
            <h1 className="large text-primary">Post not found!</h1>
            <p className="text-dark">Post might be deleted. Go back and refresh the page</p>
            <br/>
            <Link to="/posts" className="btn">
              Back to Posts
            </Link>
          </React.Fragment>
        )
      }

      {!props.loading && props.post &&
        <React.Fragment>
          <PostItem post={props.post} showActions={false}/>
          <div className="comments">
            <h1 className="lead text-primary">Comments</h1>
            {props.post.comments.map((comment) => {
              return (
                <React.Fragment>
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={props.post._id}
                  />
                </React.Fragment>
              )
            })}
          </div>
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
    loading: state.postReducer.loading,
    postError: state.postReducer.error.msg
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
