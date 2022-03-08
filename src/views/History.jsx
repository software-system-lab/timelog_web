import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import { Input, Select, MenuItem } from "@material-ui/core";
import { forwardRef } from 'react';
import { connect } from 'react-redux';
import { removeLog } from 'actions';
import { editLog } from 'actions';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight,
  Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage,
  Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personal: [{unitID: localStorage.getItem("uid"),unitName: "Personal" }],
      selectTeam: [],
      teamName : "",
      startTime: 0,
      endTime: 0,
      columns: [
        {
          title: "Title",
          field: "title",
          editComponent: props => (
            <Input defaultValue={props.value} onChange={e => props.onChange(e.target.value)} autoFocus/>
          )
        },
        {
          title: "Activity Type",
          field: "activityTypeName",
          width: "30%",
          render: rowData => this.getDocumentTypeForRow(rowData),
          editComponent:
           props => (
            <div>
              <Select
                value={this.state.selectTeam}
                onChange={event => this.setState({selectTeam: event.target.value})}
              >
                <MenuItem value={this.state.personal}>Personal</MenuItem>
                {
                  this.props.allTeamActivityTypeList.map((team, key) => {
                    return (
                        <MenuItem value={team} key={key}>{team.unitName}</MenuItem>
                    )
                  })
                }
              </Select>
              <Select
                style={{marginLeft:'10px'}}
                value={props.value}
                onChange={event => props.onChange(event.target.value)}
              >
              {
                this.state.selectTeam.unitName === this.state.personal.unitName?
                  this.props.activityTypeList.map((activityType, key) =>{
                    if(activityType.enable !== false) {
                      return (
                        <MenuItem value={activityType.name} key={key}>{activityType.name}</MenuItem>
                      )
                    }
                    return null
                  })
                :
                  this.props.allTeamActivityTypeList.map((team) => {
                    if(this.state.selectTeam.unitName === team.unitName){
                      return(
                        team.activityTypeList.map((activityType, key) => {
                        return (
                          <MenuItem value={activityType.name} key={key}>{activityType.name}</MenuItem>
                        )
                        })
                      )
                    }
                    return null
                  })
                
              }
              </Select>
            </div>
          ),
          initialEditValue: props.value
        },
        {
          title: "Start Time",
          field: "startTime",
          defaultSort: "desc",
          editComponent: ({ value, onChange }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker maxDate={moment().toDate()} format="yyyy/MM/dd HH:mm" value={value} onChange={onChange} />
            </MuiPickersUtilsProvider>
          )
        },{
          title: "End Time",
          field: "endTime",
          editComponent: ({ value, onChange }) => (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker maxDate={moment().toDate()} format="yyyy/MM/dd HH:mm" value={value} onChange={onChange} />
            </MuiPickersUtilsProvider>
          )
        }
      ],
    }
    this.editSubmit = this.editSubmit.bind(this);
    this.getDocumentTypeForRow = this.getDocumentTypeForRow.bind(this);
    
  }

  getDocumentTypeForRow(value) {
    if(value.teamName === "Personal") {
      return value.activityTypeName 
    } else {
      return `${value.activityTypeName} (${value.teamName})`
    }
  }

  editSubmit(oldData,newData) {
    if(this.state.selectTeam.unitName === this.state.personal.unitName) {
        this.props.editLog(
          localStorage.getItem("uid"),
          null,
          oldData.id,              
          newData.title,
          newData.activityTypeName,
          moment(newData.startTime).format("YYYY/MM/DD HH:mm"),
          moment(newData.endTime).format("YYYY/MM/DD HH:mm"),
          null,
          localStorage.getItem("uid"),
          this.props.memberList.map(member => member.username),
          this.props.operatedTeam
        )
    } else {
        this.props.editLog(
          localStorage.getItem("uid"),
          null,
          oldData.id,              
          newData.title,
          newData.activityTypeName,
          moment(newData.startTime).format("YYYY/MM/DD HH:mm"),
          moment(newData.endTime).format("YYYY/MM/DD HH:mm"),
          null,
          this.state.selectTeam.unitID,
          this.props.memberList.map(member => member.username),
          this.props.operatedTeam
        )
    }
  }

  render() {
    return (
      <div>
        <MaterialTable title="Log History"
          icons={ tableIcons }
          columns={this.state.columns}
          data={ this.props.logHistory }
          options={{
            search: true,
            paging: false
          }}
          localization={{ body: { editRow: { deleteText: 'Are you sure you want to delete this log?' } } }}
          editable={{
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              this.props.removeLog(
                localStorage.getItem("uid"),
                null,
                oldData.id,
                this.props.operatedTeam.teamID,
                this.props.memberList.map(member => member.username),
                this.props.operatedTeam
              )
              resolve();
            }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                if (!newData.title || newData.title === '') {
                  alert("Title should not be empty.")
                  reject()
                }
                else if (moment(newData.endTime) <= moment(newData.startTime)) {
                  alert("Start Time should be eariler than End Time.")
                  reject()
                } 
                else {
                  setTimeout(() => {
                    this.editSubmit(oldData,newData)
                    resolve();
                  }, 1000);
                }
              })
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList,
    logHistory: state.logHistory,
    allTeamActivityTypeList: state.allTeamActivityTypeList,
    operatedTeam: state.operatedTeam,
    memberList : state.memberList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeLog: (userID, token, logID, unitID, memberList, operatedTeam) => {
      dispatch(removeLog(userID, token, logID, unitID, memberList, operatedTeam))
    },
    editLog: (userID, token, logID, title, activityTypeName, startTime, endTime, description, unitID, memberList, operatedTeam) => {
      dispatch(editLog(userID, token, logID, title, activityTypeName, startTime, endTime, description, unitID, memberList, operatedTeam))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(History))