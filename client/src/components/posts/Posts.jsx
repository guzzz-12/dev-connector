import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getPosts} from "../../actions/post";
import Spinner from "../spinner/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import Pusher from "pusher-js";

const Posts = (props) => {
  useEffect(() => {
    //Inicializar pusher
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: 'us2',
      forceTLS: true
    });
    
    const channel = pusher.subscribe('posts');

    //Suscripción a los posts creados
    channel.bind('new-post', (data) => {
      props.getPosts()
    });

    //Suscripción a los posts borrados
    channel.bind('post-deleted', (data) => {
      props.getPosts()
    });

    //Suscripción a los likes y unlikes
    channel.bind('post-liked', (data) => {
      props.getPosts()
    });

    channel.bind('post-unliked', (data) => {
      props.getPosts()
    });

    props.getPosts()

    return () => {
      channel.unbind("new-post")
      channel.unbind("post-deleted")
      channel.unbind("post-liked")
      channel.unbind("post-unliked")
    }

    // eslint-disable-next-line
  }, [props.getPosts]);

  return (
    <div>
      {props.isLoading && props.posts.length === 0 && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
      {props.posts.length > 0 &&
        <React.Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i>
            {" "} Welcome to the community
          </p>
          <div className="posts">
            {props.posts.map(post => {
              return <PostItem key={post._id} post={post} showActions={true} />
            })}
          </div>
          <PostForm />
          <Link to="/profiles" className="btn btn-light">
              Back to profiles page
          </Link>
        </React.Fragment>      
      }
      {!props.loading && props.posts.length === 0 &&
        <div className="my-1">
          <h2 className="text-primary">No posts created yet.</h2>
          <PostForm />
          <Link to="/profiles" className="btn btn-light">
              Back to profiles page
          </Link>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts,
    isLoading: state.postReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(getPosts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
