import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withKeycloak } from '@react-keycloak/web';
import { makeStyles} from '@material-ui/core/styles';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const drawerWidth = '15vw';

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

  const handleDrawerToggle = () => {
    props.handleDrawerToggle();
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
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
        <Typography variant="h6" noWrap>
          Timelog
        </Typography>
      </Toolbar>
    </AppBar>
  )
}


export default withKeycloak(Appbar)
