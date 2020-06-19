import React, { Component } from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon,  Button, DialogTitle } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import HistoryIcon from '@material-ui/icons/History';
import Divider from '@material-ui/core/Divider';
import AppBar from './Appbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Sidebar.css'
import { withKeycloak } from '@react-keycloak/web'
import AddLog from './AddLog'

const drawerWidth = '15vw';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
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
  const { window, keycloak,  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [addLogOpen, setAddLogOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddLogOpen = () => {
    setAddLogOpen(true);
  };

  const handleAddLogClose = () => {
    setAddLogOpen(false);
  };

  const history = useHistory();

  const goToHistory = () => {
    history.push("/history")
  };

  const goToWelcome = () => {
    history.push("/welcome")
  };

  const container = window !== undefined ? () => window().document.body : undefined


  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img src="timelog.png" className="logo" onClick={ ()=>{ goToWelcome() } }/>
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
        <ListItem className="sidebar-list">
          <Button startIcon={<HistoryIcon/>}
            className="sidebar-list-item"
            style={{textOverflow: "clip"}}
            onClick={ ()=> {goToHistory()} }
            variant="contained"
            color="primary">
            History
          </Button>
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        <ListItem className="sidebar-list">
          <Button startIcon={<HistoryIcon/>}
            className="sidebar-list-item"
            onClick={ ()=> {goToHistory()} }
            to = "/history"
            variant="contained"
            color="primary">
            History
          </Button>
        </ListItem>
      </List> */}
    </div>
  )

  return (
    <nav className={classes.drawer}>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
      <AddLog open={addLogOpen} handleClose={handleAddLogClose}/>
    </nav>
  )
}


export default withKeycloak(Sidebar)
