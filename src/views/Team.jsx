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
import { setOperatedTeam, getTeam } from 'actions/Team';
import { updateTeamDashBoard } from 'actions/DashBoard';

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

class Team extends Component {
  constructor(props) {
    super(props)
    this.buildReportElement = this.buildReportElement.bind(this)
    this.handleChangeTeamUUID = this.handleChangeTeamUUID.bind(this)
    this.render = this.render.bind(this)
    this.clickSelectButton = this.clickSelectButton.bind(this)
    this.closeSelectFilter = this.closeSelectFilter.bind(this)
    this.selectAllFilterOptions = this.selectAllFilterOptions.bind(this)
    this.selectFilterOption = this.selectFilterOption.bind(this)
    this.clickSubmitFilter = this.clickSubmitFilter.bind(this)
    this.selectPersonalFilterOptions = this.selectPersonalFilterOptions.bind(this)

    this.state = {
      filterAnchorEl: null,
      selectedFilterList: [],
      isPersonalFilterOptionSelected: true
    };
  }

  componentDidMount() {
    this.props.refreshTeamDashBoard(
      this.props.operatedTeam.teamID,
      this.props.memberList,
      null
    );
  }

  buildReportElement() {
    // console.log(this.reportElement)
    // let clonedNode = this.reportElement.cloneNode(true)
    // clonedNode.parentElement.
    // let exportButton = clonedNode.firstChild.firstChild

    // clonedNode.firstChild.removeChild(exportButton)

    // return clonedNode
    // Export.exportHTML(clonedNode)
  };

  handleChangeTeamUUID(event) {
    // console.log(event)
    // this.props.setOperatedTeam([event.username,event.unitID])
    // this.props.getTeam(event.username,event.unitID,localStorage.getItem("uid"))
  };

  clickSelectButton(event) {
    // set anchor for popover
    this.setState({ filterAnchorEl: event.currentTarget })

    if (this.state.selectedFilterList.length === 0)
      this.setState({ selectedFilterList: [...Array(this.props.teamActivityTypeList.length).fill(true)] })
  }

  closeSelectFilter() {
    // set anchor element to null
    this.setState({ filterAnchorEl: null })
  }

  selectAllFilterOptions(event) {
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

  selectFilterOption(idx) {
    let list = [...this.state.selectedFilterList]
    list[idx] = !this.state.selectedFilterList[idx]

    this.setState({ selectedFilterList: list })
  }

  selectPersonalFilterOptions() {
    const oldState = this.state.isPersonalFilterOptionSelected
    this.setState({ isPersonalFilterOptionSelected: !oldState })
  }

  clickSubmitFilter() {
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

  render() {
    const { classes } = this.props;

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
              {
                this.props.groupList.map((group, index) => {
                  if (group.teamID === this.props.operatedTeam.teamID) {
                    return (
                      <h1 className="board-title board-text">
                        {`${group.teamName}'s Dashboard`}
                      </h1>
                    )
                  }
                  return null
                })
              }
              <h2 className="board-duration board-text">
                {moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")}
                ~
                {moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")}
              </h2>
              <h3 className="board-spent-time board-text">
                Spent Time : {this.props.teamDashBoardData.team.totalTime}
              </h3>
            </div>
            <div>
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
                          <div className={classes.teamActivityFilterOption}>
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
            </div>
          </div>
          <DashBoard pieData={this.props.teamDashBoardData.team.pieData} tableData={this.props.teamDashBoardData.team.tableData} chartArea={"50vh"} />

          <div>
            {
              this.props.teamDashBoardData.member.map((member, key) => {
                return (
                  <div className="team-member-board board-title board-text" onClick={() => this.handleChangeTeamUUID(member)}>
                    <h2>{member.username}'s Dashboard</h2>
                    <DashBoard isPersonal={false} pieData={member.pieData} tableData={member.tableData} chartArea={"25vh"} />
                  </div>
                )
              })
            }
          </div>
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
    refreshTeamDashBoard: (teamId, memberList, filterList, isPersonal) => dispatch(updateTeamDashBoard(teamId, memberList, filterList, isPersonal)),
    setOperatedTeam: (team) => dispatch(setOperatedTeam(team)),
    getTeam: (groupname, teamID, userID, token) => dispatch(getTeam(groupname, teamID, userID, token)),
  }
}

export default withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(Team)))