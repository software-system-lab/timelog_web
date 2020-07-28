import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withKeycloak } from '@react-keycloak/web';
import { makeStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Appbar.css';

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
      </Toolbar>
    </AppBar>
  )
}


export default Appbar
