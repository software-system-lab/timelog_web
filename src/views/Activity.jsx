import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import { Input } from "@material-ui/core";
import { forwardRef } from 'react';
import { editActivityType, addActivityType, removeActivityType } from 'actions';
import { connect } from 'react-redux';

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
          type: "boolean",
          initialEditValue: 'true'
        }
      ],
      id: props.id,
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
            paging: false
          }}
          localization={{ body: { editRow: { deleteText: 'Are you sure you want to delete this activity?' } } }}
          editable={{
            isEditable: rowData => rowData.name !== "LabProject" && rowData.name !== "LabDuty",
            isDeletable: rowData => rowData.name !== "LabProject" && rowData.name !== "LabDuty",
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                if (!newData.name || newData.name === ''){
                  console.log("not empty")
                  alert("Activity Type name should not be empty.")
                  reject()
                } else {
                  setTimeout(() => {
                    this.props.add(
                      [this.state.id],
                      null,
                      newData.name,
                      newData.enable,
                      newData.private
                    )
                    resolve();
                  }, 1000)
                }
                
              })
            ,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                if (!newData.name || newData.name === ''){
                  console.log("not empty")
                  alert("Activity Type name should not be empty.")
                  reject()
                }
                else {
                  console.log(this.state.id)
                  setTimeout(() => {
                    this.props.edit(
                      [this.state.id],
                      null,
                      oldData.name,
                      newData.name,
                      newData.enable,
                      newData.private
                    )
                    resolve();
                  }, 1000);
                }
              })
            ,
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                this.props.delete(
                  [this.state.id],
                  null,
                  oldData.name,
                  oldData.name,
                  oldData.enable,
                  oldData.private
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

export default Activity
