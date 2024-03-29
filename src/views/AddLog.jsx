import React, { Component } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Radio,
} from '@material-ui/core';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import { connect } from 'react-redux'
import { newLog } from 'actions'

class AddLog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      startTime: 0,
      endTime: 0,
      activityTypeName: "",
      isEnable: true,
      selectTeam: false,
      team: [],
      // myTeams: []
    }
    this.submit = this.submit.bind(this);
    this.handleSelectTeam = this.handleSelectTeam.bind(this)
  }

  handleSelectTeam (event) {
    if(event.target.value === "team") {
      this.setState({ selectTeam: true, activityTypeName: ""})
    }
    else {
      this.setState({ selectTeam: false, activityTypeName: ""})
    }
  }

  componentDidMount() {
    const currentTime = moment();
    const endTime = currentTime.toDate();
    const startTime = currentTime.subtract(this.props.duration, "seconds").toDate();

    this.setState({
      startTime: startTime,
      endTime: endTime
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.duration !== prevProps.duration) {
      this.setState({
        endTime: moment().toDate(),
        startTime: moment().subtract(this.props.duration, "seconds").toDate()
      })
    }
  }

  submit() {
    if (!this.state.title || this.state.title === ''){
      alert("Title should not be empty.")
      return
    }

    if(this.state.selectTeam){
       if(!this.state.activityTypeName || this.state.activityTypeName === ''){
        alert("Team Activity Type is not selected.")
        return
      }
    } 
    if(this.state.selectTeam === false) {
      if(!this.state.activityTypeName || this.state.activityTypeName === ''){
        alert("Activity Type is not selected.")
        return
      }
    }

    if (moment(this.state.endTime) <= moment(this.state.startTime)){
      alert("Start Time should be eariler than End Time.")
      return
    }

    const dateFormat = 'YYYY/MM/DD HH:mm'
    // send request to server
    this.props.handleClose()

    if(this.state.selectTeam){
      this.props.newLog(
        localStorage.getItem("uid"),
        null,
        this.state.title,
        this.state.activityTypeName,
        moment(this.state.startTime).format(dateFormat),
        moment(this.state.endTime).format(dateFormat),
        this.state.description,
        this.state.team.teamID,
        this.props.memberList.map(member => member.username),
        this.props.operatedTeam
      )
    } else{
      this.props.newLog(
        localStorage.getItem("uid"),
        null,
        this.state.title,
        this.state.activityTypeName,
        moment(this.state.startTime).format(dateFormat),
        moment(this.state.endTime).format(dateFormat),
        this.state.description,
        localStorage.getItem("uid"),
        this.props.memberList.map(member => member.username),
        this.props.operatedTeam
      )
    }
    this.setState({
        title: "",
        activityTypeName: "",
        startTime: moment().add(-1, "hours").toDate(),
        endTime: moment().toDate(),
        description: ""
    })
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="add-log-dialog-title">Add Log</DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth={true} required={true}>
              <InputLabel htmlFor="title" required={true}>Title</InputLabel>
              <Input id="title" onChange={(e) => {this.setState({title: e.target.value})}} />
            </FormControl>
            <br/><br/>
            <div>
              <Radio checked={this.state.selectTeam === false} onChange={this.handleSelectTeam} value="personal" ></Radio>Personal
              <Radio checked={this.state.selectTeam === true} onChange={this.handleSelectTeam} value="team" ></Radio>Team
              <FormControl required={true}>
              <InputLabel id="activity-type-select-label" required={this.state.selectTeam} style={{margin:"-12px 15px"}}> Team</InputLabel>
                <Select
                  style={{margin:"0px 10px", width:"150px"}}
                  disabled={!this.state.selectTeam}
                  labelId="activity-type-select-label"
                  id="activity-type-select"
                  value={this.state.team}
                  onChange={(event) => this.setState({team: event.target.value})}
                >
                  {
                    this.props.myTeams.map((team, key) => {
                      return (
                        <MenuItem value={team} key={key}>{team.teamName}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </div>
            
            <FormControl fullWidth>
            <InputLabel id="activity-type-select-label" required={true} >Activity Type</InputLabel>
            <Select
              labelId="activity-type-select-label"
              id="activity-type-select"
              value={this.state.activityTypeName}
              onChange={(event) => this.setState({activityTypeName: event.target.value})}
            >
            {
              this.state.selectTeam ?
                this.props.allTeamActivityTypeList.map((team) => {
                  if(this.state.team.teamName === team.unitName){
                    return(
                      team.activityTypeList.map((activityType, key) => {
                        return (
                          <MenuItem value={activityType.name} key={key}>{activityType.name}</MenuItem>
                        )
                      }) 
                    )
                  }
                  return null
                })
              :
                this.props.activityTypeList.map((activityType, key) => {
                  if(activityType.enable !== false) {
                    return (
                      <MenuItem value={activityType.name} key={key}>{activityType.name}</MenuItem>
                    )
                  }
                  return null
                })   
            }
            </Select>
            </FormControl>
            <br/><br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className="">
                    <DatePicker
                      autoOk
                      label="Start Date"
                      required={true}
                      maxDate={moment().toDate()}
                      value={this.state.startTime}
                      format="yyyy/MM/dd"
                      onChange={ date => {
                        const startTime = moment(date)
                        const endTime = moment(this.state.endTime)
                        endTime.year(startTime.year())
                          .month(startTime.month())
                          .date(startTime.date())
                        this.setState({
                          startTime: startTime,
                          endTime: endTime
                        })
                      } }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TimePicker
                      autoOk
                      label="Start Time"
                      required={true}
                      minutesStep={5}
                      value={this.state.startTime}
                      onChange={ time => {
                        const startTime = moment(time)
                        let endTime = moment(this.state.endTime)
                        const dateFormat = "yyyy/MM/DD"
                        const startDate = moment(startTime.format(dateFormat))
                        const endDate = moment(endTime.format(dateFormat))
                        if (startDate.isSame(endDate)) {
                          endTime = moment(time).add(1, "hours")
                          this.setState({ endTime: endTime.toDate() })
                        }
                        this.setState({ startTime: time })
                      } }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <DatePicker
                      autoOk
                      label="End Date"
                      required={true}
                      value={this.state.endTime}
                      format="yyyy/MM/dd"
                      onChange={ date => {
                        const startTime = moment(this.state.startTime)
                        const endTime = moment(date)
                        const dateFormat = "yyyy/MM/dd"
                        const startDate = moment(startTime.format(dateFormat))
                        const endDate = moment(endTime.format(dateFormat))

                        if (startDate < endDate) {
                          startTime.year(endTime.year())
                            .month(endTime.month())
                            .date(endTime.date())
                          this.setState({
                            startTime: startTime
                          })
                        }
                        this.setState({
                          endTime: endTime
                        })
                      } }
                      maxDate={moment().toDate()}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <TimePicker
                      autoOk
                      label="End Time"
                      required={true}
                      minutesStep={5}
                      value={this.state.endTime}
                      onChange={(time) => {this.setState({endTime: time})}}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <br/>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input id="description" onChange={(e) => {this.setState({description: e.target.value})}}/>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}

function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList,
    allTeamActivityTypeList : state.allTeamActivityTypeList,
    memberList : state.memberList,
    operatedTeam: state.operatedTeam,
    myTeams: state.myTeams
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newLog: (userID, token, title, activityTypeName, startTime, endTime, description, unitID, memberList, operatedTeam = null) => dispatch(newLog(userID, token, title, activityTypeName, startTime, endTime, description, unitID, memberList, operatedTeam)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLog)
