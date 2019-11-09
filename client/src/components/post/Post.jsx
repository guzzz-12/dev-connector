import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getSinglePost} from "../../actions/post";
import PostItem from "../posts/PostItem";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Spinner from "../spinner/Spinner";
import Pusher from "pusher-js";

const Post = (props) => {
  useEffect(() => {
    //Inicialiazar pusher
    const pusher = new Pusher("f313371965609ed3fcad", {
      cluster: 'us2',
      forceTLS: true
    });
    
    const channel = pusher.subscribe('posts');

    //Suscripción a los comentarios de los posts
    channel.bind('post-comment-added', (data) => {
      if(data.postId === props.match.params.postId) {
        props.getPost(props.match.params.postId)
      }
    });

    channel.bind('post-comment-removed', (data) => {
      if(data.postId === props.match.params.postId) {
        props.getPost(props.match.params.postId)
      }
    });

    //Cargar los posts
    props.getPost(props.match.params.postId)

    //Desuscribirse de los channels de pusher al salirse del post
    return () => {
      channel.unbind("post-comment-added")
      channel.unbind("post-comment-removed")
    }

    // eslint-disable-next-line
  }, [props.getPost]);

  return (
    <React.Fragment>
      {props.isLoading && !props.post && (
        <div className="spinner-container" style={{width: "100vw", height: "100vh"}}>
          <Spinner />
        </div>
      )}

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
    isLoading: state.postReducer.loading,
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
