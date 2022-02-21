import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import FilterListIcon from '@material-ui/icons/FilterList';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';

import "./Board.css";
import Export from '../export/export.js';
import { updateDashBoard, loadDashBoard } from 'actions/DashBoard';

import DashBoard from './DashBoard';

const useStyles = (theme) => ({
  root: {
    width: '100%',
    maxWidth: '32vw',
    flexGrow: 1
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
  }
});

class Board extends Component {
  constructor(props) {
    super(props)
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.submit = this.submit.bind(this)
    this.initialize = this.initialize.bind(this)
    this.state = {
      anchorEl: null,
      open: false,
      activityTypeList: [],
      flag: true,
      filterList: [],
      select: false,
    };
  }

  exportReport() {
    let clonedNode = this.reportElement.cloneNode(true)
    let exportButton = clonedNode.firstChild.firstChild
    let selectButton = clonedNode.firstChild.lastChild

    clonedNode.firstChild.removeChild(exportButton)
    clonedNode.firstChild.removeChild(selectButton)

    Export.exportHTML(clonedNode)
  };

  flipOpen = () => this.setState({ ...this.state, open: !this.state.open });
  handleClick = event => {
    this.initialize();
    console.log(event.currentTarget)
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
  };
  handleProfileClose = event => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
  };

  handleInputChange(event) {
    for (const each of this.state.activityTypeList) {
      if (each.name === event.target.value) {
        each.checked = event.target.checked;
      }
      if (each.checked === false) {
        this.setState({ select: false })
      }
    }
    for (const each of this.state.activityTypeList) {
      if (each.checked === true) {
        this.setState({ select: true })
      } else {
        this.setState({ select: false })
        break
      }
    }
    this.setState({ activityTypeList: this.state.activityTypeList });
  }

  handleSelectAll(event) {
    if (this.state.select === false) {
      for (const each of this.state.activityTypeList) {
        each.checked = true;
      }
      this.setState({ select: true });
    } else {
      for (const each of this.state.activityTypeList) {
        each.checked = false;
      }
      this.setState({ select: false });
    }
    this.setState({ activityTypeList: this.state.activityTypeList });
  }

  componentDidMount() {
    const userId = localStorage.getItem('uid')
    if (userId) {
      this.props.loadDashBoard(localStorage.getItem("uid"), null);
    }
  }

  initialize() {
    if (this.state.activityTypeList.length === 0) {
      this.setState({ activityTypeList: [] });
      this.props.activityTypeList.map((activityType) => {
        return this.props.dashBoardData.tableData.map((data) => {
          if (data.activityTypeName === activityType.name) {
            var activityTypeInput = {
              name: activityType.name,
              checked: false
            }
            this.state.activityTypeList.push(activityTypeInput);
            return true;
          }
          return false;
        })
      })
      this.props.allTeamActivityTypeList.map((team) => {
        return team.activityTypeList.map((activityType) => {
          return this.props.dashBoardData.tableData.map((data) => {
            if (data.activityTypeName === activityType.name) {
              var activityTypeInput = {
                name: activityType.name,
                checked: false
              }
              this.state.activityTypeList.push(activityTypeInput);
              return true;
            }
            return false;
          })
        })
      })
      this.props.groupList.map((team) => {
        return this.props.dashBoardData.tableData.map((data) => {
          if (data.activityTypeName === team.teamName) {
            var activityTypeInput = {
              name: team.teamName,
              checked: false
            }
            this.state.activityTypeList.push(activityTypeInput);
            return true;
          }
          return false;
        })
      })
    } else {
      for (const each of this.state.activityTypeList) {
        each.checked = false;
      }
      this.setState({ select: false });
    }
  };

  submit() {
    this.setState({ filterList: [] });
    for (const each of this.state.activityTypeList) {
      if (each.checked === true) {
        this.state.filterList.push(each.name)
      }
    }
    this.props.updateDashBoard(
      localStorage.getItem("uid"),
      null,
      this.state.filterList)
  }

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
                  title="Zoom the web browser to 100% for better result"
                  classes={{ popper: { 'font-size': '20px' } }}
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
              <h1 className="board-title board-text">
                {`${localStorage.getItem('displayName')}'s Dashboard`}
              </h1>
              <h2 className="board-duration board-text">
                {moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")}
                ~
                {moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")}
              </h2>
              <h3 className="board-spent-time board-text">
                Spent Time : {this.props.dashBoardData.totalTime}
              </h3>
            </div>
            <div>
              <div className="selector-button">
                <Button
                  onClick={event => this.handleClick(event)}
                  startIcon={<FilterListIcon />}
                  variant="outlined"
                  style={{ color: white, borderColor: white }}
                >
                  Filter
                </Button>
                <div className="popover">
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleProfileClose}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    style={{
                      width: '150%',
                      height: '150%',
                    }}
                  >
                    <div className="filter-list">
                      <Checkbox checked={this.state.select} onChange={this.handleSelectAll}></Checkbox>
                      Select All
                    </div>
                    {
                      this.state.activityTypeList.map((activityType, key) => {
                        return (
                          <div className="filter-list">
                            <Checkbox value={activityType.name} checked={activityType.checked} onChange={this.handleInputChange}></Checkbox>
                            {activityType.name}

                          </div>
                        )
                      })
                    }
                    <center>
                      <Button className="filter-btn" onClick={this.submit} color="secondary">
                        Submit
                      </Button>
                    </center>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <DashBoard groupList={this.state.group} pieData={this.props.dashBoardData.pieData} tableData={this.props.dashBoardData.tableData} chartArea={"50vh"} isPersonal={true} />

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashBoardData: state.dashBoardData,
    activityTypeList: state.activityTypeList,
    allTeamActivityTypeList: state.allTeamActivityTypeList,
    groupList: state.groupList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDashBoard: (userID, token, filterList) => dispatch(updateDashBoard(userID, token, filterList)),
    loadDashBoard: (userID, toker) => dispatch(loadDashBoard(userID, toker)),
  }
}

export default withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(withRouter(Board)))
