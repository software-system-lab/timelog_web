import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import { Input } from "@material-ui/core";
import { forwardRef } from 'react';
import { editActivityType, addActivityType, removeActivityType } from 'actions';
import { connect } from 'react-redux';
import { withKeycloak } from '@react-keycloak/web'

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

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          title: "Activity Type",
          field: "name",
          editComponent: props => (
              <Input defaultValue={props.value} onChange={e => props.onChange(e.target.value)} autoFocus/>
          )
        },{
          title: "Private",
          field: "private",
          type: "boolean"
        },{
          title: "Enable",
          field: "enable",
          type: "boolean"
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <MaterialTable title="Activity"
          icons={tableIcons}
          columns={this.state.columns}
          data={this.props.activityTypeList}
          options={{
            search: true,
            sorting: true,
          }}
          localization={{ body: { editRow: { deleteText: 'Are you sure you want to delete this activity?' } } }}
          editable={{
            isEditable: rowData => rowData.name !== "LabProject",
            isDeletable: rowData => rowData.name !== "LabProject",
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.props.addActivityType(
                    this.props.keycloak.subject,
                    this.props.keycloak.token,
                    newData.name,
                    newData.enable,
                    newData.private
                  )
                  resolve();
                }, 1000)
              })
            ,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.props.editActivityType(
                    this.props.keycloak.subject,
                    this.props.keycloak.token,
                    oldData.name,
                    newData.name,
                    newData.enable,
                    newData.private
                  )
                  resolve();
                }, 1000);
              })
            ,
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                this.props.removeActivityType(
                  this.props.keycloak.subject,
                  this.props.keycloak.token,
                  oldData.name
                )
                resolve();
              }, 1000);
            })
        }}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activityTypeList: state.activityTypeList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editActivityType: (userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate) =>
      dispatch(editActivityType(userID, token, targetActivityTypeName, activityTypeName, isEnable, isPrivate)),
    addActivityType: (userID, token, activityTypeName, isEnable, isPrivate) =>
      dispatch(addActivityType(userID, token, activityTypeName, isEnable, isPrivate)),
    removeActivityType: (userID, token, activityTypeName) =>
      dispatch(removeActivityType(userID, token, activityTypeName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withKeycloak(withRouter(Activity)))
