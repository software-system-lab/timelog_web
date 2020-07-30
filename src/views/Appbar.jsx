import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Appbar.css';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PopoverProfile from './PopoverProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100%)`,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  pink: {
    color: '#fff',
    backgroundColor: '#fa8072',
  },
  toolbar: theme.mixins.toolbar,
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} style={{background:'#303030'}}>
      <Toolbar>
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
          <img src="TIME_LOG.png" alt="TIMELOG" onClick={ ()=>{ goToWelcome() } }>
          </img>
        </div>
        <div className="profile-btn" >
          <Avatar className={classes.pink} onClick={handleClick} id="profile-icon" style={{display:'none'}}>
            <AccountCircleIcon />
          </Avatar>
          <Popover
            open={Boolean(anchorEl)}
            margin='100px'
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            style={{
              width: '150%',
              height: '150%',
              display: 'none',
            }}
          >
            <PopoverProfile></PopoverProfile>
          </Popover>
        </div>
        <Button className = "logout-btn" variant="contained" color="primary" style={{display:'none'}}>
            LOGOUT
        </Button>
      </Toolbar>
    </AppBar>
  )
}


export default Appbar
