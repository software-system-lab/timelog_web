import React, { Component, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { Button,MenuItem } from '@material-ui/core';
import Chart from "react-google-charts";
import GetAppIcon from '@material-ui/icons/GetApp';
import "./Team.css";
import Export from '../export/export.js';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import moment from "moment";
import { updateTeamDashBoard } from 'actions/DashBoard';
import { setOperatedTeam, getTeam} from 'actions/Team';
import { withStyles } from '@material-ui/core/styles';
import { ArrowDownward } from '@material-ui/icons';
import { forwardRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = (theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '70vw'
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

class Team extends Component {
  
  constructor(props) {
    super(props)
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
    this.submit = this.submit.bind(this)
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
  handleProfileClose = event => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
  };

  submit() {
    // this.state.filterList = []
    // for(const each of this.state.activityTypeList){
    //   if( each.checked == true){
    //     this.state.filterList.push(each.name)
    //   }
    // }
    // this.props.updateDashBoard(
    //   localStorage.getItem("uid"),
    //   null,
    //   this.state.filterList)  
  }

  render() {
    const open = this.state.anchorEl === null ? false : true;
    const { classes } = this.props;
    const white = '#FFFFFF';
    
    return (
        <div>
          <div className={classes.exportButton}>
            <Button startIcon={<GetAppIcon/>}
              onClick={ this.submit }
              variant="outlined"
              style={{color: white, borderColor: white, marginLeft:35}}>
              Export
            </Button>
            <p className={classes.exportText}>
                Please adjust the web browser<br></br>
                zoom to 100% for better result
            </p>
          </div>
          <div ref={ (element) => {this.reportElement = element} }>
            {
              this.props.groupList.map((group,index) => {
                if(group.teamID == this.props.operatedTeam)
                {
                  return(
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
              Spent Time : {this.props.teamDashBoardData.totalTime}
            </h3>
            
            <div className="board-split">
              <div className="chart">
                <Chart
                  minWidth={''}
                  width={'99%'}
                  height={'50vh'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={this.props.teamDashBoardData.pieData}
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
                  data={this.props.teamDashBoardData.tableData}
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

          <div>
            <Grid container spacing={3} className ={classes.container} >
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <Chart
                      minWidth={''}
                      width={'99%'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={this.props.teamDashBoardData.pieData}
                      options={{
                        chartArea: {width: '100%', height: '95%', left: '5%', right: '5%'},
                        title: 'DashBoard',
                        tooltip: {trigger:'none'},
                        legend: {position: 'left'}
                      }}
                      rootProps={{ 'data-testid': '1' }}
                    />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <MaterialTable title=""
                    icons={ tableIcons }
                    columns={[
                      { title: "Activity Type", field: "activityTypeName", backgroundColor: '#3C3D42'},
                      { title: "Spent Time", field: "timeLength", defaultSort:'desc' },
                      { title: "Percentage", field: "percentage" },
                    ]}
                    data={this.props.teamDashBoardData.tableData}
                    sortDirection={"timeLength"}
                    options={{
                      search: false,
                      paging: false,
                      toolbar: false,
                      sorting: true,
                      tableLayout: "fixed"
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    teamDashBoardData: state.teamDashBoardData,
    activityTypeList: state.activityTypeList,
    operatedTeam: state.operatedTeam,
    groupList: state.groupList,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateTeamDashBoard: (userID, token, filterList) => dispatch(updateTeamDashBoard(userID, token, filterList))
  }
}

export default withStyles(useStyles,{withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(withRouter(Team)))


