import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import { withRouter } from "react-router-dom";
import FilterListIcon from '@material-ui/icons/FilterList';

import {
  Button,
  Checkbox,
  Popover,
  withStyles
} from '@material-ui/core'

import DashboardExporter from "../components/DashboardExporter";

import "./Team.css";
import DashBoard from './DashBoard';
import { updateTeamDashBoard } from 'actions/DashBoard';
import { setIsUpdatingTeamDashboard } from "../actions/DashBoard";

const useStyles = (theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '70vw'
  },
  exportText: {
    fontSize: '10pt',
    color: '#FFFFFF',
    opacity: 0
  },
  boardHead: {
    display: 'flex',
    width: '100%',
    'justify-content': 'space-around',
    'align-items': 'center'
  },
  exportButton: {
    '&:hover p': {
      opacity: 1,
    },
    color: 'white',
    borderColor: 'white',
    width: '120px'
  },
  selectButton: {
    color: 'white',
    borderColor: 'white',
    width: '120px'
  },
  teamActivityFilterList: {
    padding: '5px'
  },
  teamActivityFilterOption: {
    marginRight: '15px'
  },
  btnSubmitFilterArea: {
    marginBottom: '5px'
  },
  btnSubmitFilter: {
    padding: '5px'
  }
});

// const allTeams = process.env.NODE_ENV === 'development' ? [
const sslTeams = process.env.REACT_APP_ENV === 'development' ? [
  {
    name: 'Team0',
    members: ['zoezou9']
  },
  {
    name: 'Team1',
    members: ['mashu6211', 'Sean', 'test']
  },
  {
    name: 'Team2',
    members: ['mandy723', 'c20m76z']
  },
  {
    name: 'Team3',
    members: ['RuiChen']
  },
] : [
  {
    name: 'CapstoneRobotTest2',
    members: ['tan109598112']
  },
  {
    name: 'dcTrack',
    members: ['xie57813', 'bear888660', '110598109', 't107590020', 'sam981431', 'angeleeee123', 'yenwen']
  },
  {
    name: 'ezKanban',
    members: ['nightlord851108', 'ycycchre', 'mandy723', 'kevin871207', 'a98976537', 'fiveman0830', 'eddie0818']
  },
  {
    name: 'IoT-Dev',
    members: ['benny870704', 'Zachary672', 'jn2657']
  },
]

const sunbirdTeams = [
  {
      name: "dcTrack", // 7
      members: ["yenwen", "xie57813", "bear888660", "110598109", "t107590020", "sam981431", "angeleeee123"]
  },
  {
      name: "CapstoneRobotTest1", // 9
      members: ["kazuya1208", "JimboMachine", "jennifer779", "Thaoma2509", "henry111598031", "ntut_tommy"]
  }, 
  {
      name: "CapstoneRobotTest2",  // 7 多了一個
      members: ["tan109598112", "tree1109", "t108590006", "Jeff0829", "weber", "bernadette451"]
  },
  {
      name: "CrossFunctionalFrontEnd", // 6 少三個人 對
      members: ["peter110", "t109590042", "yuanhao91", "Lau0108", "timno1", "kerueilin9", "kyl0213lee"]
  },
  {
      name: "CrossFunctionalServer", // 10
      members: ["ireneezheng", "matti2905", "hung61601", "weikeup", "109590006", "store604218", "asdf456753123"]

  },
  {
    name: "Left",
    members: ["wakandaforever2022", "Lwj0310", "remi30789", "ming119", "kanapui", "shiow620412", "karma1827", "aa681577", "shawn578597", "Ken0820", "starvian7"]
  }
]

const sunbirdMaster = [
  {
    name: "dcTrack",
    members: ["yenwen", "xie57813", "bear888660", "110598109", "t107590020", "sam981431", "angeleeee123"]
  },
  {
      name: "CapstoneRobotTest1",
      members: ["kazuya1208", "henry111598031"]
  },
  {
      name: "CapstoneRobotTest2",
      members: ["tan109598112", "Jeff0829", "weber"]
  },
  {
      name: "CrossFunctionalFrontEnd", 
      members: ["peter110", "timno1", "kyl0213lee"]
  },
  {
      name: "CrossFunctionalServer",
      members: ["hung61601", "weikeup"]
  },
  {
    name: "Left",
    members: ["julia166", "shawn82tw", "Aaron123", "larry870322", "fly990314", "wyc1995", "bonnie37", "wakandaforever2022"]
  }
]

class Team extends Component {
  constructor(props) {
    super(props)
    this.render = this.render.bind(this)

    this.state = {
      filterAnchorEl: null,
      selectedFilterList: [],
      isPersonalFilterOptionSelected: true
    };
  }

  componentDidMount() {
    if (this.props.operatedTeam.teamID) {
      this.props.setIsUpdatingTeamDashboard(true)
      this.props.refreshTeamDashboard(
        this.props.operatedTeam.teamID,
        this.props.memberList.map(member => member.username),
        null,
        true,
        this.props.operatedTeam.teamName
      );
    }
  }

  clickSelectButton = (event) => {
    // set anchor for popover
    this.setState({ filterAnchorEl: event.currentTarget })

    if (this.state.selectedFilterList.length === 0)
      this.setState({ selectedFilterList: [...Array(this.props.teamActivityTypeList.length).fill(true)] })
  }

  closeSelectFilter = () => {
    // set anchor element to null
    this.setState({ filterAnchorEl: null })
  }

  selectAllFilterOptions = (event) => {
    // update activity type list
    const atLeastOneNotSelected = this.state.selectedFilterList.some(opt => !opt)
    const newList = this.state.selectedFilterList.map(opt => event.target.checked)
    this.setState({ selectedFilterList: newList })

    // update personal option
    if (atLeastOneNotSelected) {
      this.setState({ isPersonalFilterOptionSelected: true })
    } else {
      const oldState = this.state.isPersonalFilterOptionSelected
      this.setState({ isPersonalFilterOptionSelected: !oldState })
    }
  }

  selectFilterOption = (idx) => {
    let list = [...this.state.selectedFilterList]
    list[idx] = !this.state.selectedFilterList[idx]

    this.setState({ selectedFilterList: list })
  }

  selectPersonalFilterOptions = () => {
    const oldState = this.state.isPersonalFilterOptionSelected
    this.setState({ isPersonalFilterOptionSelected: !oldState })
  }

  clickSubmitFilter = () => {
    // make filter list (array of string)
    const selectedFilterList = this.state.selectedFilterList
    let filterList = this.props.teamActivityTypeList
      .filter((activity, idx) => selectedFilterList[idx])
      .map(activity => activity.name)

    // close filter panel
    this.closeSelectFilter()

    // call api to update team dashboard
    this.props.refreshTeamDashBoard(
      this.props.operatedTeam.teamID,
      this.props.memberList,
      filterList,
      this.state.isPersonalFilterOptionSelected
    );
  }

  buildAllMembersLog = () => {
    let logs = []
    let allTeams = []
    if (this.props.operatedTeam.teamName === "Software System Lab") {
      allTeams = sslTeams
    } else if (this.props.operatedTeam.teamName === "Sunbird") {
      allTeams = sunbirdTeams
    } else if (this.props.operatedTeam.teamName === "Sunbird Master") {
      allTeams = sunbirdMaster
    }
    allTeams.forEach((team, idx) => {
      logs.push(
        <div className="ssl-team-member-board-header" key={`header-${idx}`}>
          <h3>{team.name}</h3>
        </div>
      )

      logs.push(
        team.members.map((username) => {
          let member = this.props.teamDashBoardData.member.find(m => m.username === username)
          if (!!! member) {
            return null
          }

          return (
            <div key={`dashboard-${username}`} className="team-member-board board-title board-text">
              <h2>{member.displayName}'s Dashboard</h2>
              <h3>{`spent time: ${member.totalTime}`}</h3>
              <DashBoard isPersonal={false} pieData={member.pieData} tableData={member.tableData} chartArea={"25vh"} />
            </div>
          )
        })
      )
    })

    return logs
  }

  render = () => {
    const { classes } = this.props;
    const activeTeam = this.props.groupList.filter(group => group.teamID === this.props.operatedTeam.teamID)[0]

    return (
      <div>
        <div ref={el => { this.reportElement = el }}>
          <div className={classes.boardHead}>
            <div className={classes.exportButton} id="export-delete">
              <DashboardExporter
                targetEl={this.reportElement}
                logData={this.props.teamDashBoardData}
              />
            </div>
            <div>
              <h1 className="board-title board-text">
                { activeTeam ? `${activeTeam.teamName}'s Dashboard` : null }
              </h1>
              <h2 className="board-duration board-text">
                {moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")}
                ~
                {moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")}
              </h2>
              <h3 className="board-spent-time board-text">
                Spent Time : {this.props.teamDashBoardData.team.totalTime}
              </h3>
            </div>
            {
              activeTeam ?
              <div style={{width: '120px'}}></div>
            :
              <div className="selector-button" id="export-delete">
                <Button
                  onClick={event => this.clickSelectButton(event)}
                  startIcon={<FilterListIcon />}
                  variant="outlined"
                  className={classes.selectButton}
                >
                  Filter
                </Button>
                <Popover
                  open={!!this.state.filterAnchorEl}
                  anchorEl={this.state.filterAnchorEl}
                  onClose={this.closeSelectFilter}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <div className={classes.teamActivityFilterList}>
                    <div className={classes.teamActivityFilterOption}>
                      <Checkbox
                        onChange={this.selectAllFilterOptions}
                        checked={this.state.selectedFilterList.every(opt => opt) && this.state.isPersonalFilterOptionSelected}
                      />
                      <span>Select All</span>
                    </div>
                    {
                      this.props.teamActivityTypeList.map((activityType, idx) => {
                        return (
                          <div key={idx} className={classes.teamActivityFilterOption}>
                            <Checkbox
                              onChange={() => this.selectFilterOption(idx)}
                              checked={this.state.selectedFilterList[idx]}
                            />
                            <span>{activityType.name}</span>
                          </div>
                        )
                      })
                    }
                    <div className={classes.teamActivityFilterOption}>
                      <Checkbox
                        onChange={this.selectPersonalFilterOptions}
                        checked={this.state.isPersonalFilterOptionSelected}
                      />
                      <span>Personal</span>
                    </div>
                  </div>
                  <center className={classes.btnSubmitFilterArea}>
                    <Button
                      className={classes.btnSubmitFilter}
                      color="secondary"
                      onClick={this.clickSubmitFilter}
                    >
                      Submit
                    </Button>
                  </center>
                </Popover>
              </div>
            }
          </div>

          <DashBoard pieData={this.props.teamDashBoardData.team.pieData} tableData={this.props.teamDashBoardData.team.tableData} chartArea={"50vh"} />

          {
            activeTeam && (activeTeam.teamName === 'Software System Lab' || 
                            activeTeam.teamName === 'Sunbird' || 
                            activeTeam.teamName === 'Sunbird Master') ?
            this.buildAllMembersLog()
          :
            this.props.teamDashBoardData.member.map((member, idx) => {
              return (
                <div key={idx} className="team-member-board board-title board-text">
                  <h2>{member.displayName}'s Dashboard</h2>
                  <h3>{`spent time: ${member.totalTime}`}</h3>
                  <DashBoard isPersonal={false} pieData={member.pieData} tableData={member.tableData} chartArea={"25vh"} />
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamDashBoardData: state.teamDashBoardData,
    activityTypeList: state.activityTypeList,
    memberList: state.memberList,
    operatedTeam: state.operatedTeam,
    groupList: state.groupList,
    teamActivityTypeList: state.teamActivityTypeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    refreshTeamDashboard: (teamId, memberList, filterList, isPersonal, teamName) => 
      dispatch(updateTeamDashBoard(teamId, memberList, filterList, isPersonal, teamName)),
    setIsUpdatingTeamDashboard: (status) => dispatch(setIsUpdatingTeamDashboard(status))
  }
}

export default withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(Team)))