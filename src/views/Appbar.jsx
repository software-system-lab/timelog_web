import React,{ seCallback, useState , useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Appbar.css';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import PopoverProfile from './PopoverProfile';
import { connect } from 'react-redux';
import "./Stopwatch.css";
import { readableCounter } from "../utils";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import { setOperatedTeam, getTeam} from 'actions/Team';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

const useStyles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:'#303030',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100%)`, 
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconColor: {
    color: '#fff' ,
    backgroundColor: '#00C6CF' ,
  },
  toolbar: theme.mixins.toolbar,
  toolBar: {
    justifyContent:'space-between',
    'align-items': 'center'
  },
  popover: {
    width: '150%',
    height: '150%',
  },
  teamTextField: {
    width: '150px',
    'border-radius': '5px'
  },
  selectLabel: {
    color: 'white'
  },
  teamSelect: {
    color: 'white',
    'border-bottom': '2px solid white',
  },
  teamSelectIcon: {
    color: 'white'
  }
});

class MyAppBar extends Component {
  constructor(props) {
    super(props)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.goToWelcome = this.goToWelcome.bind(this)
    this.handleProfileClick = this.handleProfileClick.bind(this)
    this.handleProfileClose = this.handleProfileClose.bind(this)
    this.handleTeamSelect = this.handleTeamSelect.bind(this)
    this.initialize = this.initialize.bind(this)
    this.state = { 
      anchorProfile: null, 
      team: '',
      displayName : localStorage.getItem("displayName"),
      
    };
  }

  handleDrawerToggle = () => {
    this.props.handleDrawerToggle();
  };

  goToWelcome = () => {
    this.props.history.push("/")
  };

  handleProfileClick = (event) => {
    this.setState({anchorProfile: event.currentTarget});
  };

  handleProfileClose = () => {
    this.setState({anchorProfile: null});
  };

  handleTeamSelect = (event) => {
    this.setState({
      team: event.target.value
    })
    this.props.setOperatedTeam(event.target.value)
    this.props.getTeam(event.target.value.teamName,event.target.value.teamID,localStorage.getItem("uid"))
  };

  initialize = () => {
    this.setState({
      team: this.props.operatedTeam
    })
    
  };
  
  componentWillMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    if (this.props.operatedTeam !== prevProps.operatedTeam) {
      this.initialize();
    }
  }

  render() {
    const { classes , history } = this.props;
    
    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolBar}> 
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <div className="appbar-LOGO">
              <img src="TIME_LOG.png" alt="TIMELOG" onClick={ ()=>{ this.goToWelcome(); } }>
              </img>
            </div>
            <div className="timer-bar">
              <h1 className="timer-header">{this.props.timeString === '0.0' ? '': readableCounter(this.props.timeString)}</h1>
            </div>
            <div className="team-list">
              <FormControl >
                <TextField
                  value = {this.state.team}
                  select
                  label="Team"
                  onChange={this.handleTeamSelect} 
                  className={classes.teamTextField}
                  variant='standard'
                  size='small'
                  margin='none'
                  InputLabelProps={{
                    classes: {
                      root: classes.selectLabel,
                    }
                  }}
                  SelectProps={{
                    classes: {select: classes.teamSelect, icon: classes.teamSelectIcon}
                  }}
                >
                  {
                    this.props.groupList.map((group,index) => {
                      return(
                        <MenuItem key={index} value={group}>{group.teamName}</MenuItem>
                      )
                    })
                  }
                </TextField>
              </FormControl>
            </div>
            <div className="profile-btn" >
              <Avatar className={classes.iconColor}  alt={this.state.displayName} src="/broken-image.jpg" onClick={this.handleProfileClick} id="profile-icon"/>
              <Popover
                open={Boolean(this.state.anchorProfile)}
                margin='100px'
                anchorEl={this.state.anchorProfile}
                onClose={this.handleProfileClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                className={classes.popover}
              >
                <PopoverProfile></PopoverProfile>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>

      </div>
    
    );
  }

}


function mapStateToProps(state) {
  return {
    timeString: state.stopWatchTime,
    groupList: state.groupList,
    operatedTeam: state.operatedTeam,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setOperatedTeam: (team) => dispatch(setOperatedTeam(team)),
    getTeam: (groupname, teamID, userID ,token) => dispatch(getTeam(groupname, teamID, userID, token))
  }
}
export default withRouter(withStyles(useStyles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(MyAppBar)))



