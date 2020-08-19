import React, { useState } from 'react';
import './UserProfile.css';
import {
  Avatar,
  Button
} from '@material-ui/core';

export default function PopoverProfile() {
  const [displayName, ] = useState(localStorage.getItem("displayName"));
  const [name, ] = useState(localStorage.getItem("cn"));
  const [email, ] = useState(localStorage.getItem("mail"));

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <center>
      <div className="profile-box">
        <div className="profile-split"></div>
        <Avatar className="avatar-name" alt={displayName} src="/broken-image.jpg"/>
        <div className="profile-split"></div>
        <div>
          <p>{displayName}</p>
          <p>{name}</p>
          <p>{email}</p>
        </div>
        <div className="profile-split"></div>
        <Button 
          className = "logout-btn" 
          variant="contained" 
          color="primary" 
          style = {{minWidth : "6vw"}}
          onClick = {logout}
          >
            LOGOUT
        </Button>
      </div>
    </center>
  )
}