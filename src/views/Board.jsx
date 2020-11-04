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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { updateDashBoard } from 'actions/DashBoard';
import { ExposureZero } from "@material-ui/icons";


class Board extends Component {
  
  constructor(props) {
    super(props)
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
    this.handleInputChange= this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this)
    this.state = { 
      anchorEl: null, 
      open: false,
      activityTypeList: [],
      flag: true,
      filterList: []
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

  initialize() {
    if(this.state.flag && this.props.activityTypeList.length != 0) {
      this.state.activityTypeList = [];
      this.props.activityTypeList.map((activityType) => { 
        var activityTypeInput = {
          name : activityType.name,
          checked : true
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
    this.initialize();
    const white = '#FFFFFF';
    return (
        <div>
          <div className="export-button">
            <Button startIcon={<GetAppIcon/>}
              onClick={ this.exportReport }
              variant="outlined"
              style={{color: white, borderColor: white, marginLeft:35}}>
              Export
            </Button>
            <p className="export-note">
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
                  columns={[
                    { title: "Activity Type", field: "activityTypeName", backgroundColor: '#3C3D42'},
                    { title: "Spent Time", field: "timeLength" },
                    { title: "Percentage", field: "percentage" },
                  ]}
                  data={this.props.dashBoardData.tableData}
                  options={{
                    search: false,
                    paging: false,
                    toolbar: false,
                    sorting: false,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board))
