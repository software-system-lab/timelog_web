import React from 'react'
import {
  Drawer,
  List, 
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Grid,
  FormControl,
  Divider,
  makeStyles,
  Slide
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ReportIcon from '@material-ui/icons/Report';
import TimerIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from 'react-router-dom';
import './Sidebar.css'
import AddLog from './AddLog'
import Duration from './Duration'
import Stopwatch from './Stopwatch'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import PersonIcon from '@material-ui/icons/Person';


const drawerWidth = '230px';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: `calc(100%)`,
    [theme.breakpoints.down('sm')]: {
      display: props => !props.mobileOpen ? 'none' : 'block',
      position: 'absolute'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },

}));

function Sidebar(props) {
  const classes = useStyles(props);
  const [logDuration, setLogDuration] = React.useState(3600);
  const [addLogOpen, setAddLogOpen] = React.useState(false);
  const [durationOpen, setDurationOpen] = React.useState(false);
  const [stopwatchOpen, setStopwatchOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const [teamOpen, setTeamOpen] = React.useState(false);

  const handleUser= () => {
    setUserOpen(!userOpen);
  };

  const handleTeam = () => {
    setTeamOpen(!teamOpen);
  };

  const handleAddLogOpen = (logDuration = 3600) => {
    setAddLogOpen(true);
    setLogDuration(logDuration);
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

  const handleStopwatchOpen = () => {
    setStopwatchOpen(true);
  };

  const handleStopwatchClose = () => {
    setStopwatchOpen(false);
  };

  const history = useHistory();

  const goToBoard = () => {
    history.push("/board")
  };

  const goToHistory = () => {
    history.push("/history")
  };

  const goToTeam = () => {
    history.push("/team")
  };

  const goToActivity = () => {
    history.push("/userActivity")
  };

  const goToTeamActivity = () => {
    history.push("/teamActivity")
  };


  const goToTimebox = () => {
    history.push("/timebox")
  };

  const drawer = (
    <div className="drawer-wrapper">
      <div className={classes.toolbar}>
      </div>
      <List>
        <div className="sidebar-button">
          <Slide direction="right" in={true} timeout={{appear:500, enter:500, exit:500}}>
            <ListItem className="sidebar-list">
              <Button startIcon={<AddIcon/>}
                className="sidebar-list-item"
                onClick={handleAddLogOpen}
                variant="contained"
                fullWidth={true}
                color="primary" 
              >
                Add Log
              </Button>
            </ListItem>
          </Slide>
          <Slide direction="right" in={true} timeout={{appear:800, enter:800, exit:800}}>
          <ListItem className="sidebar-list">
              <Button startIcon={<TimerIcon/>}
                className="sidebar-list-item"
                onClick={handleStopwatchOpen}
                variant="contained"
                fullWidth={true}
                color="primary" 
                >
                Stopwatch
              </Button>
            </ListItem>
          </Slide>
          <Slide direction="right" in={true} timeout={{appear:1200, enter:1200, exit:1200}}>
            <ListItem className="sidebar-list">
              <Button startIcon={<AvTimerIcon/>}
                className="sidebar-list-item"
                onClick={handleDurationOpen}
                variant="contained"
                fullWidth={true}
                color="primary" 
                >
                Duration
              </Button>
            </ListItem>
          </Slide>
        </div>
        <Slide direction="right" in={true} timeout={{appear:1200, enter:1200, exit:1200}}>
          <ListItem className="sidebar-list">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <FormControl className="">
                    <DatePicker
                      autoOk
                      label="Start Date"
                      value={ localStorage.getItem("startDate") }
                      format="yyyy/MM/dd"
                      disabled={true}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </ListItem>
        </Slide>
        <Slide direction="right" in={true} timeout={{appear:1200, enter:1200, exit:1200}}>
          <ListItem className="sidebar-list">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <FormControl>
                    <DatePicker
                      autoOk
                      label="End Date"
                      value={ localStorage.getItem("endDate") }
                      format="yyyy/MM/dd"
                      disabled={true}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </ListItem>
        </Slide>
      </List>
      <Divider/>
      <List>
        <Slide direction="right" in={true} timeout={{appear:500, enter:500, exit:500}}>
          <ListItem className="sidebar-list" button onClick={handleUser}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Personal" />
          {userOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Slide>
        <Collapse in={userOpen} timeout="auto" unmountOnExit>
        {/* <Slide className={classes.nested} direction="right" in={true} timeout={{appear:1500, enter:1500, exit:1500}}>
          <ListItem button key="Board" onClick={goToBoard}>
            <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
            <ListItemText primary="Board" />
          </ListItem>
        </Slide> */}
        <Slide direction="right" in={true} timeout={{appear:1800, enter:1800, exit:1800}}>
          <ListItem className={classes.nested} button key="History" onClick={goToHistory}>
            <ListItemIcon>{<HistoryIcon />}</ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </Slide>
        <Slide direction="right" in={true} timeout={{appear:2100, enter:2100, exit:2100}}>
          <ListItem className={classes.nested} button key="Activity" onClick={goToActivity}>
            <ListItemIcon>{<LibraryBooksIcon />}</ListItemIcon>
            <ListItemText primary="Activity" />
          </ListItem>
        </Slide>
        </Collapse>
        <Slide direction="right" in={true} timeout={{appear:2100, enter:2100, exit:2100}}>
          <ListItem button key="Team" onClick={handleTeam}>
            <ListItemIcon>{<GroupIcon />}</ListItemIcon>
            <ListItemText primary="Team" />
            {teamOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </Slide>
        <Collapse in={teamOpen} timeout="auto" unmountOnExit>
        <Slide className={classes.nested} direction="right" in={true} timeout={{appear:1500, enter:1500, exit:1500}}>
          <ListItem button key="Board" onClick={goToTeam}>
            <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
            <ListItemText primary="Board" />
          </ListItem>
        </Slide>
        <Slide direction="right" in={true} timeout={{appear:2100, enter:2100, exit:2100}}>
          <ListItem className={classes.nested} button key="Activity" onClick={goToTeamActivity}>
            <ListItemIcon>{<LibraryBooksIcon />}</ListItemIcon>
            <ListItemText primary="Activity" />
          </ListItem>
        </Slide>
        </Collapse>
        <Slide direction="right" in={true} timeout={{appear:2400, enter:2400, exit:2400}}>
          <ListItem button key="Timebox" onClick={goToTimebox} style={{display:"none"}}>
            <ListItemIcon>{<TimelapseIcon />}</ListItemIcon>
            <ListItemText primary="Timebox" />
          </ListItem>
        </Slide>
        <Divider style={{margin:'25px 20px'}}/>
      </List>
      <Slide direction="right" in={true} timeout={{appear:2700, enter:2700, exit:2700}}>
        <a className="report-button" href="https://github.com/software-system-lab/timelog_web/issues" target="_blank" rel="noopener noreferrer">
          <ListItem button key="Report Issue">
            <ListItemIcon>{<ReportIcon color="secondary" />}</ListItemIcon>
            <ListItemText primary="Report Issue" />
          </ListItem>
        </a>
      </Slide>
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
      <AddLog className="AddLog" duration={logDuration} open={addLogOpen} handleClose={handleAddLogClose}/>
      <Duration className="Duration" open={durationOpen} handleClose={handleDurationClose} startDate={props.startDate} endDate={props.endDate} updateDates={props.updateDates}/>
      <Stopwatch className="Stopwatch" open={stopwatchOpen} handleClose={handleStopwatchClose} openAddLogDialog={handleAddLogOpen} />
    </nav>
  )
}


export default (Sidebar);
