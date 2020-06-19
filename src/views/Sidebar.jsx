import React from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon,  Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/History';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Sidebar.css'
import { withKeycloak } from '@react-keycloak/web'
import AddLog from './AddLog'
import UserProfile from './UserProfile';

const drawerWidth = '15vw';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    // height: '100vh',
    // position: 'relative',
  },
  
}));



function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const [addLogOpen, setAddLogOpen] = React.useState(false);
  const [userProfileOpen, setUserProfileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  //   props.mobileOpen = !props.handleDrawerToggle();
  // };

  const handleAddLogOpen = () => {
    setAddLogOpen(true);
  };

  const handleAddLogClose = () => {
    setAddLogOpen(false);
  };

  const handleUserProfileOpen = () => {
    setUserProfileOpen(true);
  };

  const handleUserProfileClose = () => {
    setUserProfileOpen(false);
  };

  const history = useHistory();

  const goToHistory = () => {
    history.push("/history")
  };

  const goToActivity = () => {
    history.push("/activity")
  };

  const goToWelcome = () => {
    history.push("/welcome")
  };

  const container = window !== undefined ? () => window().document.body : undefined


  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img alt="Timelog" src="timelog.png" className="logo" onClick={ ()=>{ goToWelcome() } }/>
      </div>
      <List>
        <ListItem className="sidebar-list">
          <Button startIcon={<AddIcon/>}
            className="sidebar-list-item"
            onClick={ ()=>{ handleAddLogOpen() } }
            variant="contained"
            color="primary">
            Add Log
          </Button>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button key="History" onClick={ ()=> {goToHistory()} }>
          <ListItemIcon>{<HistoryIcon />}</ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button key="Activity" onClick={ ()=> {goToActivity()} }>
          <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
          <ListItemText primary="Activity" />
        </ListItem>
        <ListItem button key="Profile" onClick={ ()=> {handleUserProfileOpen()} }>
          <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
      <AddLog className="AddLog" open={addLogOpen} handleClose={handleAddLogClose}/>
      <UserProfile className="UserProfile" open={userProfileOpen} handleClose={handleUserProfileClose}/>
    </nav>
  )
}


export default withKeycloak(Sidebar)
