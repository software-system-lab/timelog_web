import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import "./Team.css";
import Export from '../export/export.js';
import { connect } from 'react-redux';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
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
  exportButton: {
    '&:hover p': {
      opacity: 1,
    }
  },
  boardHead: {
    display: 'flex',
    width: '100%',
    'justify-content': 'space-around',
    'align-items': 'center'
  },
  tooltip: {

  }
});

class Team extends Component {

  constructor(props) {
    super(props)
    this.exportReport = this.exportReport.bind(this)
    this.handleChangeTeamUUID = this.handleChangeTeamUUID.bind(this)
    this.render = this.render.bind(this)
    this.state = {
      anchorEl: null,
      open: false,
      activityTypeList: [],
      flag: true,
      filterList: [],
      select: false,
    };
  }

  componentDidMount() {
    this.props.refreshTeamDashBoard(this.props.operatedTeam.teamID, this.props.memberList);
  }

  exportReport() {
    let clonedNode = this.reportElement.cloneNode(true)
    let exportButton = clonedNode.firstChild.firstChild

    clonedNode.firstChild.removeChild(exportButton)

    Export.exportHTML(clonedNode)
  };

  handleChangeTeamUUID(event) {
    console.log(event)
    // this.props.setOperatedTeam([event.username,event.unitID])
    // this.props.getTeam(event.username,event.unitID,localStorage.getItem("uid"))
  };

  render() {
    const { classes } = this.props;
    const white = '#FFFFFF';

    return (
      <div>
        <div ref={(element) => { this.reportElement = element }}>
          <div className={classes.boardHead}>
            <div>
              <div className={classes.exportButton}>
                <Tooltip
                  arrow
                  title={"Zoom the web browser to 100% for better result"}
                  // classes={{tooltip: {'font-size': '19px'}}}
                  className={classes.tooltip}
                >
                  <Button startIcon={<GetAppIcon />}
                    onClick={this.exportReport}
                    variant="outlined"
                    style={{ color: white, borderColor: white }}>
                    Export
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div>
              {
                this.props.groupList.map((group, index) => {
                  if (group.teamID == this.props.operatedTeam.teamID) {
                    return (
                      <h1 className="board-title board-text">
                        {`${group.teamName}'s Dashboard`}
                      </h1>
                    )
                  }
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
            <div style={{ width: '115px' }}></div>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    refreshTeamDashBoard: (teamId, memberList) => dispatch(updateTeamDashBoard(teamId, memberList)),
    setOperatedTeam: (team) => dispatch(setOperatedTeam(team)),
    getTeam: (groupname, teamID, userID, token) => dispatch(getTeam(groupname, teamID, userID, token))
  }
}

export default withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(Team)))