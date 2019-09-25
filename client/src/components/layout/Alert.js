import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Alert = (props) => {
  return props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => {
    return (
      <div 
        key={alert.id}
        className={`alert alert-${alert.alertType}`}
      >
        {alert.msg}
      </div>
    )
  })
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alertReducer
  }
}

export default connect(mapStateToProps)(Alert);

