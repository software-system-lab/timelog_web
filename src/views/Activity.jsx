import React, { Component } from "react"
import MaterialTable from "material-table";
import { Input } from "@material-ui/core";
import { post } from '../request/http';
import {load_activity_type_list} from '../request/loadData'
import tableIcons from '../icon/tableIcons'

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          title: "Activity Type",
          field: "name",
          editComponent: name => (
              <Input defaultValue={name.value} onChange={e => name.onChange(e.target.value)} autoFocus/>
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
      activityTypeList: []
    }
  }

  loadActivityTypeList() {
    load_activity_type_list(localStorage.getItem("uid"), response => {
      this.props.updateActivity(response.data)
    }, err => {
      console.log(err)
      alert('Load activity type list failed')
    })
  }

  componentDidMount() {
    this.loadActivityTypeList()
  }

  render() {
    return (
      <div data-testid="activity">
        <MaterialTable title="Activity"
          icons={tableIcons}
          columns={this.state.columns}
          data={this.props.activityData.activityTypeList}
          id='activity-table'
          options={{
            search: true,
            sorting: true,
            paging: false,
            draggable: false
          }}
          localization={{ body: { editRow: { deleteText: 'Are you sure you want to delete this activity?' } } }}
          editable={{
            isEditable: rowData => rowData.name !== "LabProject" && rowData.name !== "LabDuty",
            isDeletable: rowData => rowData.name !== "LabProject" && rowData.name !== "LabDuty",
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const headers = {}
                  const body = {
                      userID: localStorage.getItem("uid"),
                      activityTypeName: newData.name,
                      isEnable: newData.enable,
                      isPrivate: newData.private
                  }
                  post('/activity/add', body, headers, response => {
                    this.loadActivityTypeList()
                  }, err => {
                    console.log(err)
                    alert("Add activity type failed")
                  })
                  resolve();
                }, 1000)
              })
            ,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const headers = {}
                  const body = {
                      userID: localStorage.getItem("uid"),
                      targetActivityTypeName: oldData.name,
                      activityTypeName: newData.name,
                      isEnable: newData.enable,
                      isPrivate: newData.private
                  }
                  post('/activity/edit', body, headers, response => {
                    this.loadActivityTypeList()
                  }, err => {
                    console.log(err)
                    alert("Edit failed")
                  })
                  resolve();
                }, 1000);
              })
            ,
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const headers = {}
                const body = {
                    userID: localStorage.getItem("uid"),
                    activityTypeName: oldData.name
                }
                post('/activity/remove', body, headers, response => {
                  this.loadActivityTypeList()
                }, err => {
                  console.log(err)
                  alert("Remove activity type failed")
                })
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
