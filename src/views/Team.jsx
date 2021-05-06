import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import "./Team.css";
import Export from '../export/export.js';
import { connect } from 'react-redux';
import moment from "moment";
import { updateTeamDashBoard } from 'actions/DashBoard';
import { withStyles } from '@material-ui/core/styles';
import { ArrowDownward } from '@material-ui/icons';
import { forwardRef } from 'react';
import DashBoard from './DashBoard';


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

  render() {
    const open = this.state.anchorEl === null ? false : true;
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
              Spent Time : {this.props.teamDashBoardData.team.totalTime}
            </h3>
            <DashBoard pieData={this.props.teamDashBoardData.team.pieData} tableData={this.props.teamDashBoardData.team.tableData} chartArea= {"50vh"}/>

            <div>
            {
              this.props.teamDashBoardData.member.map((member, key) => {
                return (
                  <div className="team-member-board">
                    <h2>{member.username}'s Dashboard</h2>
                    <DashBoard pieData={member.pieData} tableData={member.tableData} chartArea= {"25vh"}/>
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


