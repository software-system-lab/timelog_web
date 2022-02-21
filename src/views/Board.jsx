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
  },
  personalActivityFilterList: {
    padding: '5px'
  },
  personalActivityFilterOption: {
    marginRight: '15px'
  },
  btnSubmitFilterArea: {
    marginBottom: '5px'
  },
  btnSubmitFilter: {
    padding: '5px'
  }
});

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterAnchorEl: null,
      open: false,
      activityTypeList: [],
      selectedActivityTypes: null,
      flag: true,
      filterList: [],
      select: false,
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem('uid')
    if (userId) {
      this.props.loadDashBoard(userId, null)
    }
  }

  exportReport = () => {
    let clonedNode = this.reportElement.cloneNode(true)
    let exportButton = clonedNode.firstChild.firstChild
    let selectButton = clonedNode.firstChild.lastChild

    clonedNode.firstChild.removeChild(exportButton)
    clonedNode.firstChild.removeChild(selectButton)

    Export.exportHTML(clonedNode)
  };

  buildFilterList = () => {
    if (this.state.selectedActivityTypes === null) {
      this.setState({
        activityTypeList: this.props.dashBoardData.tableData.map(data => data.activityTypeName),
        selectedActivityTypes: this.props.dashBoardData.tableData.map(data => data.activityTypeName)
      })
    }
  }

  clickOpenFilter = event => {
    // set anchor element for popover
    this.setState({ filterAnchorEl: event.currentTarget })

    // make filter list (concat personal and team)
    this.buildFilterList()
  };

  closeSelectFilter = () => {
    // set anchor element to null
    this.setState({ filterAnchorEl: null })
  }

  selectAllFilterOptions = () => {
    if (this.state.selectedActivityTypes.length < this.state.activityTypeList.length) {
      this.setState({ selectedActivityTypes: this.state.activityTypeList })
    } else {
      this.setState({ selectedActivityTypes: [] })
    }
    this.setState({ activityTypeList: this.state.activityTypeList });
  }

  componentDidMount() {
    const userId = localStorage.getItem('uid')
    if (userId) {
      this.props.loadDashBoard(localStorage.getItem("uid"), null);
    }
  }

  selectFilterOption = activityTypeName => {
    if (this.state.selectedActivityTypes.includes(activityTypeName)) {
      this.setState({
        selectedActivityTypes: this.state.selectedActivityTypes.filter(act => act !== activityTypeName)
      })
    } else {
      this.setState({
        selectedActivityTypes: [activityTypeName, ...this.state.selectedActivityTypes]
      })
    }
  }

  clickSubmitFilter = () => {
    this.props.updateDashBoard(
      localStorage.getItem('uid'),
      null,
      this.state.selectedActivityTypes
    )

    this.setState({ filterAnchorEl: null })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div ref={el => { this.reportElement = el }}>
          <div className={classes.boardHead}>
            <div>
              <div className={classes.exportButton}>
                <Tooltip
                  title="Zoom the web browser to 100% for better result"
                  // classes={{ popper: { 'font-size': '20px' } }}
                >
                  <Button startIcon={<GetAppIcon />}
                    onClick={this.exportReport}
                    variant="outlined"
                    style={{ color: 'white', borderColor: 'white' }}>
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
                  onClick={event => this.clickOpenFilter(event)}
                  startIcon={<FilterListIcon />}
                  variant="outlined"
                  style={{ color: 'white', borderColor: 'white' }}
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
                  <div className={classes.personalActivityFilterList}>
                    <div className={classes.personalActivityFilterOption}>
                      <Checkbox
                        onChange={this.selectAllFilterOptions}
                        checked={!!this.state.filterAnchorEl && this.state.selectedActivityTypes.length === this.state.activityTypeList.length}
                      />
                      <span>Select All</span>
                    </div>
                    {
                      this.state.activityTypeList.map((activityType, idx) => {
                        return (
                          <div
                            className={classes.personalActivityFilterOption}
                            key={activityType}
                          >
                            <Checkbox
                              onChange={() => this.selectFilterOption(activityType)}
                              checked={!!this.state.selectedActivityTypes && this.state.selectedActivityTypes.includes(activityType)}
                            />
                            <span>{activityType}</span>
                          </div>
                        )
                      })
                    }
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
