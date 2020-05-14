import React, { Component } from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon,  Button, DialogTitle } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './Sidebar.css'

import AddLog from './AddLog'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



function Sidebar(props) {
  const { window, keycloak } = props;
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

  const container = window !== undefined ? () => window().document.body : undefined


  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img src="timelog.png" className="logo"/>
      </div>
      <List>
        <ListItem >
          <Button startIcon={<AddIcon/>}
            className="sidebar-list-tiem"
            onClick={ ()=>{ handleAddLogOpen() } }
            variant="contained"
            color="primary">
            Add Log
          </Button>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
    </div>
  )
}

export default Sidebar
