import React, { useState } from 'react';
import './UserProfile.css';
import {
  Avatar,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';

function PopoverProfile(props) {
  const [displayName] = useState(localStorage.getItem("displayName"));
  const [username] = useState(localStorage.getItem("cn"));
  const [email] = useState(localStorage.getItem("mail"));

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const ams = () => {
    var redirectURL = process.env.REACT_APP_AMS_WEB + "?";
    redirectURL += "cn=" + username + "&";
    redirectURL += "displayName=" + displayName + "&"; 
    redirectURL += "teamName=" + props.operatedTeam.teamName; 
    window.open(redirectURL);
  
  }

  return (
    <center>
      <div className="profile-box">
        <div className="profile-split"></div>
        <Avatar className="avatar-name" alt={displayName} src="/broken-image.jpg"/>
        <div className="profile-split"></div>
        <div>
          <p>{displayName}</p>
          <p>{username}</p>
          <p>{email}</p>
        </div>
        <div className="profile-split"></div>
        <div className="btn-div">
          {/* <Button 
            className = "ams-btn" 
            variant="contained" 
            color="primary" 
            style = {{minWidth : "6vw"}}
            onClick = {ams}
            >
              ACCOUNT
          </Button> */}
          <Button 
            className = "logout-btn" 
            variant="contained" 
            color="primary" 
            style = {{minWidth : "6vw", margin : "10px"}}
            onClick = {logout}
            >
              LOGOUT
          </Button>
        </div>
        
      </div>
    </center>
  )
};

function mapStateToProps(state) {
  return {
    operatedTeam: state.operatedTeam,
  }
}


export default connect(mapStateToProps)(PopoverProfile);
