import React,{ useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Appbar.css';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import PopoverProfile from './PopoverProfile';
import { connect } from 'react-redux';
import "./Stopwatch.css";
import { readableCounter } from "../utils";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';
import { setOperatedTeam, getTeam} from 'actions/Team';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100%)`,
      zIndex: theme.zIndex.drawer + 1,
      background:'#303030',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
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
  },
  popover: {
    width: '150%',
    height: '150%',
  },
  select: {
    width: '150px',
    height: '40px',
    margin: '10px'
  }

}));

function Appbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleDrawerToggle = () => {
    props.handleDrawerToggle();
  };

  const goToWelcome = () => {
    history.push("/welcome")
  };

  const [anchorProfile, setAnchorProfile] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfile(null);
  };

  const displayName = localStorage.getItem("displayName");
  const [team, setTeam] = React.useState(''); 

  const handleTeamSelect = (event) => {
    setTeam(event.target.value)
    props.setOperatedTeam(event.target.value)
    props.getTeam(event.target.value.teamName,event.target.value.teamID,localStorage.getItem("uid"))
  };

  const initialize = () => {
    console.log(props.groupList[0])
    setTeam(props.groupList[0])
  }; 

  useEffect(() => {
    /* 下面是 componentDidMount*/
    
    
    /* 上面是 componentDidMount */
    
    return (() => {
      /* 下面是 componentWillUnmount */
      console.log("componentWillUnmount")
      
      initialize();
      /* 上面是 componentWillUnmount */
    });
    
  }, [team]); 
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}> 
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
        <MenuIcon />
        </IconButton>
        <div className="appbar-LOGO">
          <img src="TIME_LOG.png" alt="TIMELOG" onClick={ ()=>{ goToWelcome(); } }>
          </img>
        </div>
        <div className="timer-bar">
          <h1 className="timer-header">{props.timeString === '0.0' ? '': readableCounter(props.timeString)}</h1>
        </div>
        <div className="team-list">
          <FormControl >
            <InputLabel >Team</InputLabel>
            <Select
              value = {team} 
              style={{color: '#000000', borderColor: '#FFFFFF', background: '#FFFFFF', width: '150px', height: '40px'}}
              label={"Team"}
              inputProps={{
                name: 'Team'
              }}
              onChange={handleTeamSelect} 
              className={classes.select}
            >
              {
                props.groupList.map((group,index) => {
                  return(
                    <MenuItem key={index} value={group}>{group.teamName}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </div>
        <div className="profile-btn" >
          <Avatar className={classes.iconColor}  alt={displayName} src="/broken-image.jpg" onClick={handleProfileClick} id="profile-icon"/>
          <Popover
            open={Boolean(anchorProfile)}
            margin='100px'
            anchorEl={anchorProfile}
            onClose={handleProfileClose}
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
  )
}

function mapStateToProps(state) {
  return {
    timeString: state.stopWatchTime,
    groupList: state.groupList,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setOperatedTeam: (team) => dispatch(setOperatedTeam(team)),
    getTeam: (groupname, teamID, userID ,token) => dispatch(getTeam(groupname, teamID, userID, token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Appbar)
