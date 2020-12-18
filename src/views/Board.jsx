import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import Chart from "react-google-charts";
import GetAppIcon from '@material-ui/icons/GetApp';
import FilterListIcon from '@material-ui/icons/FilterList';
import "./Board.css";
import Export from '../export/export.js';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import Popover from '@material-ui/core/Popover';
import moment from "moment";
import Checkbox from '@material-ui/core/Checkbox';
import { updateDashBoard } from 'actions/DashBoard';
import { withStyles } from '@material-ui/core/styles';
import { ArrowDownward } from '@material-ui/icons';
import { forwardRef } from 'react'

const useStyles = (theme) => ({
  root: {
    width : '100%',
    maxWidth: '32vw',
    flexGrow: 1
  },
  exportText: {
    fontSize: '10pt',
    color:'#FFFFFF',
    opacity: 0
  },
  exportButton: {
    position: 'absolute',
    top: '5%',
    '&:hover p': { 
      opacity: 1,
    }
  }
});

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};

class Board extends Component {
  
  constructor(props) {
    super(props)
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleSelectAll= this.handleSelectAll.bind(this);
    this.submit = this.submit.bind(this)
    this.state = { 
      anchorEl: null, 
      open: false,
      activityTypeList: [],
      flag: true,
      filterList: [],
      select: false
       };
  }

  exportReport() {
    Export.exportHTML(this.reportElement)
  };

  flipOpen = () => this.setState({ ...this.state, open: !this.state.open });
  handleClick = event => {
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
    for(const each of this.state.activityTypeList) {
        if( each.name == event.target.value) {
          each.checked = event.target.checked;
        }
    }
      this.setState({ activityTypeList: this.state.activityTypeList});
  }

  handleSelectAll(event) {
    if( this.state.select == false) {
      for(const each of this.state.activityTypeList) {
          each.checked = true;
        }
        this.state.select = true;
      }else {
        for(const each of this.state.activityTypeList) {
          each.checked = false;
        }
        this.state.select = false;
    }

      this.setState({ activityTypeList: this.state.activityTypeList});
  }

  initialize() {
    if(this.state.flag && this.props.activityTypeList.length != 0) {
      this.state.activityTypeList = [];
      this.props.activityTypeList.map((activityType) => { 
        var activityTypeInput = {
          name : activityType.name,
          checked : false
        }
        this.state.activityTypeList.push(activityTypeInput);
      })
      this.state.flag = false;
    }
  }

  submit() {
    this.state.filterList = []
    for(const each of this.state.activityTypeList){
      if( each.checked == true){
        this.state.filterList.push(each.name)
      }
    }
    this.props.updateDashBoard(
      localStorage.getItem("uid"),
      null,
      this.state.filterList)  
  }

  render() {
    const open = this.state.anchorEl === null ? false : true;
    const { classes } = this.props;
    this.initialize();
    const white = '#FFFFFF';
    return (
        <div>
          <div className={classes.exportButton}>
            <Button startIcon={<GetAppIcon/>}
              onClick={ this.exportReport }
              variant="outlined"
              style={{color: white, borderColor: white, marginLeft:35}}>
              Export
            </Button>
            <p className={classes.exportText}>
                Please adjust the web browser<br></br>
                zoom to 100% for better result
            </p>
          </div>
          <div className="selector-button">
            <Button            
              onClick={event => this.handleClick(event)}
              startIcon={<FilterListIcon/>}
              variant="outlined"
              style={{color: white, borderColor: white, marginLeft:35}}
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
                  <Checkbox onChange={this.handleSelectAll}></Checkbox>
                  Select All
                </div>
              {
                this.state.activityTypeList.map((activityType, key) => {
                  return (
                    <div className="filter-list">
                      <Checkbox  value={activityType.name} checked={activityType.checked} onChange={this.handleInputChange}></Checkbox>
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
          <div ref={ (element) => {this.reportElement = element} }>
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
            
            <div className="board-split">
              <div className="chart">
                <Chart
                  minWidth={''}
                  width={'99%'}
                  height={'50vh'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={this.props.dashBoardData.pieData}
                  options={{
                    chartArea: {width: '100%', height: '95%', left: '5%', right: '5%'},
                    title: 'DashBoard',
                    tooltip: {trigger:'none'},
                    legend: {position: 'left'},
                    legendTextStyle: {color:white},
                    backgroundColor: '#3C3D42',
                    color: white
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </div>
              <div className="table">
                <MaterialTable title=""
                  icons={ tableIcons }
                  columns={[
                    { title: "Activity Type", field: "activityTypeName", backgroundColor: '#3C3D42'},
                    { title: "Spent Time", field: "timeLength", defaultSort:'desc' },
                    { title: "Percentage", field: "percentage" },
                  ]}
                  data={this.props.dashBoardData.tableData}
                  sortDirection={"timeLength"}
                  options={{
                    search: false,
                    paging: false,
                    toolbar: false,
                    sorting: true,
                    tableLayout: "fixed"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    dashBoardData: state.dashBoardData,
    activityTypeList: state.activityTypeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDashBoard: (userID, token, filterList) => dispatch(updateDashBoard(userID, token, filterList)),
  }
}

export default withStyles(useStyles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withRouter(Board)))


