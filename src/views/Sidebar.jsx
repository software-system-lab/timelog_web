import React from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Button,
  Grid, FormControl } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Sidebar.css'
import { withKeycloak } from '@react-keycloak/web'
import AddLog from './AddLog'
import Duration from './Duration'
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

// class Sidebar extends Component {
//
//     constructor(props) {
//         super(props);
//         this.classes = useStyles();
//         this.theme = useTheme();
//         this.history = useHistory();
//
//         this.state = {
//             addLogOpen: false,
//             durationOpen: false,
//             userProfileOpen: false
//         }
//
//         this.handleAddLogOpen = this.handleAddLogOpen.bind(this);
//         this.handleAddLogClose = this.handleAddLogClose.bind(this);
//         this.handleDurationOpen = this.handleDurationOpen.bind(this);
//         this.handleDurationClose = this.handleDurationClose.bind(this);
//         this.handleUserProfileOpen = this.handleUserProfileOpen.bind(this);
//         this.handleUserProfileClose = this.handleUserProfileClose.bind(this);
//
//         this.goToBoard = this.goToBoard.bind(this);
//         this.goToHistory = this.goToHistory.bind(this);
//         this.goToActivity = this.goToActivity.bind(this);
//         this.goToWelcome = this.goToWelcome.bind(this);
//     }
//
//     handleAddLogOpen() {
//         this.setState({addLogOpen: true});
//     }
//
//     handleAddLogClose() {
//         this.setState({addLogOpen: false});
//     }
//
//     handleDurationOpen() {
//         this.setState({durationOpen: true});
//     }
//
//     handleDurationClose() {
//         this.setState({durationOpen: false});
//     }
//
//     handleUserProfileOpen() {
//         this.setState({userProfileOpen: true});
//     }
//
//     handleUserProfileClose() {
//         this.setState({userProfileOpen: false});
//     }
//
//     goToBoard() {
//         this.history.push('/board');
//     }
//
//     goToHistory() {
//         this.history.push('/history');
//     }
//
//     goToActivity() {
//         this.history.push('/activity');
//     }
//
//     goToWelcome() {
//         this.history.push('/welcome');
//     }
// }

function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const [addLogOpen, setAddLogOpen] = React.useState(false);
  const [durationOpen, setDurationOpen] = React.useState(false);
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

  const handleDurationOpen = () => {
    setDurationOpen(true);
  };

  const handleDurationClose = () => {
    setDurationOpen(false);
  };

  const handleUserProfileOpen = () => {
    setUserProfileOpen(true);
  };

  const handleUserProfileClose = () => {
    setUserProfileOpen(false);
  };

  const history = useHistory();

  const goToBoard = () => {
    history.push("/board")
  };

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
        <ListItem className="sidebar-list">
          <Button startIcon={<AvTimerIcon/>}
            className="sidebar-list-item"
            onClick={ ()=>{ handleDurationOpen() } }
            variant="contained"
            color="primary">
            Duration
          </Button>
        </ListItem>
        <ListItem className="sidebar-list">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <FormControl className="">
                  <DatePicker
                    autoOk
                    label="Start date"
                    value={ localStorage.getItem("startDate") }
                    format="yyyy/MM/dd"
                    disabled={true}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </ListItem>
        <ListItem className="sidebar-list">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <FormControl>
                  <DatePicker
                    autoOk
                    label="End date"
                    value={ localStorage.getItem("endDate") }
                    format="yyyy/MM/dd"
                    disabled={true}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </ListItem>
      </List>
      <Divider/>
      <List>
      <ListItem button key="Board" onClick={ ()=> {goToBoard()} }>
          <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
          <ListItemText primary="Board" />
        </ListItem>
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
      <Duration className="Duration" open={durationOpen} handleClose={handleDurationClose} startDate={props.startDate} endDate={props.endDate} updateDates={props.updateDates}/>
      <UserProfile className="UserProfile" open={userProfileOpen} handleClose={handleUserProfileClose}/>
    </nav>
  )
}

export default withKeycloak(Sidebar);
