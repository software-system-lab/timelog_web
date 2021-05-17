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

import DashBoard from './DashBoard';

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

class Board extends Component {
  
  constructor(props) {
    super(props)
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleSelectAll= this.handleSelectAll.bind(this);
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
    Export.exportHTML(this.reportElement)
  };

  flipOpen = () => this.setState({ ...this.state, open: !this.state.open });
  handleClick = event => {
    this.initialize();
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
        if( each.name === event.target.value) {
          each.checked = event.target.checked;
        }
        if(each.checked === false) {
          this.setState({ select: false})
        }
    }
    for(const each of this.state.activityTypeList) {
      if(each.checked === true) {
        this.setState({ select: true})
      } else {
        this.setState({ select: false})
        break
      }
    }
    this.setState({ activityTypeList: this.state.activityTypeList});
  }

  handleSelectAll(event) {
    if( this.state.select === false) {
      for(const each of this.state.activityTypeList) {
          each.checked = true;
        }
        this.setState({select: true});
      }else {
        for(const each of this.state.activityTypeList) {
          each.checked = false;
        }
        this.setState({select: false});
      }
      this.setState({ activityTypeList: this.state.activityTypeList});
  }

  initialize() {
    if(this.state.activityTypeList.length === 0) {
      this.setState({ activityTypeList: [] });
      this.props.activityTypeList.map((activityType) => {
        return this.props.dashBoardData.tableData.map((data)=>{
          if(data.activityTypeName === activityType.name){
            var activityTypeInput = {
            name : activityType.name,
            checked : false}
            this.state.activityTypeList.push(activityTypeInput);
            return true;
          }
          return false;
        })
      })
      this.props.allTeamActivityTypeList.map((team) => {
          team.activityTypeList.map((activityType) => {
            return this.props.dashBoardData.tableData.map((data)=>{
              if(data.activityTypeName === activityType.name){
                var activityTypeInput = {
                name : activityType.name,
                checked : false}
                this.state.activityTypeList.push(activityTypeInput);
                return true;
              }
              return false;
            })
          })
      })
    } else {
      for(const each of this.state.activityTypeList) {
        each.checked = false;
      }
      this.setState({select: false});

    }
  };

  submit() {
    this.setState({ filterList: [] });
    for(const each of this.state.activityTypeList){
      if( each.checked === true){
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
                  <Checkbox checked={this.state.select} onChange={this.handleSelectAll}></Checkbox>
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
            <DashBoard pieData={this.props.dashBoardData.pieData} tableData={this.props.dashBoardData.tableData} chartArea= {"50vh"}/>

          </div>
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    dashBoardData: state.dashBoardData,
    activityTypeList: state.activityTypeList,
    allTeamActivityTypeList : state.allTeamActivityTypeList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDashBoard: (userID, token, filterList) => dispatch(updateDashBoard(userID, token, filterList)),
  }
}

export default withStyles(useStyles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withRouter(Board)))
