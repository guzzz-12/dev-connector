import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getPosts} from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = (props) => {
  useEffect(() => {
    props.getPosts()
  }, [props.getPosts]);

  return (
    <div>
      {props.loading && <Spinner />}
      {props.posts.length > 0 &&
        <React.Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i>
            {" "} Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {props.posts.map(post => {
              return <PostItem key={post._id} post={post} showActions={true} />
            })}
          </div>
        </React.Fragment>      
      }
      {!props.loading && props.posts.length === 0 &&
        <div className="my-1">
          <h2 className="text-primary">No posts created yet.</h2>
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
    loading: state.postReducer.loading
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
