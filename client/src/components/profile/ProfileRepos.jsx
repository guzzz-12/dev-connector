import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getGithubRepos} from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileRepos = (props) => {
  useEffect(() => {
    props.getRepos(props.githubUser)
  }, [props.getRepos]);

  const renderRepos = (repos) => {
    return repos.map((repo) => {
      return (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
            </h4>
            {repo.description &&
              <p>{repo.description}</p>            
            }
          </div>
          <div>
            <ul>
              <li style={{padding: "0.5rem"}} className="badge badge-primary">Stars: {repo.stargazers_count}</li>
              <li style={{padding: "0.5rem"}} className="badge badge-dark">Watchers: {repo.watchers_count}</li>
              <li style={{padding: "0.5rem"}} className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      )
    })
  }

  return (
    <React.Fragment>
      {props.repos.length > 0 ?
        renderRepos(props.repos) :
        <Spinner />    
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    repos: state.profileReducer.repos,
    loading: state.profileReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRepos: (username) => {
      dispatch(getGithubRepos(username))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileRepos);
