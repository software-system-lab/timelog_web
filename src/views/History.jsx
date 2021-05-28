import React, { Component } from "react"
import MaterialTable from "material-table"
import { Input, Select, MenuItem } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import {post} from '../request/http'
import {load_dash_board, load_history} from '../request/loadData'
import tableIcons from '../icon/tableIcons'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: 0,
      endTime: 0,
      columns: [
        {
          title: "Title",
          field: "title",
          editComponent: title => (
            <Input defaultValue={title.value} onChange={e => title.onChange(e.target.value)} autoFocus/>
          )
        },
        {
          title: "Activity Type",
          field: "activityTypeName",
          editComponent: activityTypeName => (
            <Select
              value={activityTypeName.value}
              onChange={event => activityTypeName.onChange(event.target.value)}
            >
              {
                this.props.activityData.activityTypeList.filter(activityType => activityType.enable === true).map((activityType, key) => {
                  return (
                      <MenuItem value={activityType.name} key={key}>{activityType.name}</MenuItem>
                  )
                })
              }
            </Select>
          ),
          initialEditValue: props.value
        },{
          title: "Start Time",
          field: "startTime",
          defaultSort: "desc",
          editComponent: this.editDateTimePicker
        },{
          title: "End Time",
          field: "endTime",
          editComponent: this.editDateTimePicker
        }
      ],
    }
  }

  editDateTimePicker({ value, onChange }) {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker maxDate={moment().toDate()} format="yyyy/MM/dd HH:mm" value={value} onChange={onChange} />
      </MuiPickersUtilsProvider>
    )
  }  

  loadHistory() {
    load_history(localStorage.getItem("uid"), response => {
      this.props.updateHistory(response.data)
    }, err => {
      console.log(err)
      alert('Get histroy logs failed')
    })
  }

  loadDashBoard() {
    load_dash_board(localStorage.getItem("uid"), null, response => {
      this.props.updateBoard(response.data)
    }, err => {
      console.log(err)
      alert('load board data failed')
    })
  }

  componentDidMount() {
    this._isMounted = true
    this.loadHistory()
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div data-testid="history" id='history'>
        <MaterialTable title="Log History" id='history_table'
          icons={ tableIcons }
          columns={this.state.columns}
          data={ this.props.historyData.logItemList }
          options={{
            search: true,
            paging: false,
            draggable: false
          }}
          localization={{ body: { editRow: { deleteText: 'Are you sure you want to delete this log?' } } }}
          editable={{
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              const headers = {}
              const body = {
                userID: localStorage.getItem("uid"),
                logID: oldData.id
              }
              post('/log/remove', body, headers, response => {
                this.loadHistory()
                this.loadDashBoard()
              }, err => {
                console.log(err)
                alert("Remove log failed")
              })
              resolve();
            }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                if (!newData.title || newData.title === '') {
                  const msg = "Title should not be empty."
                  alert(msg)
                  reject(msg)
                }
                else if (moment(newData.endTime) <= moment(newData.startTime)) {
                  const msg = "Start Time should be eariler than End Time."
                  alert(msg)
                  reject(msg)
                } 
                else {
                  setTimeout(() => {
                    const headers = {}
                    const body = {
                      userID: localStorage.getItem("uid"),
                      logID: oldData.id,
                      title: newData.title,
                      activityTypeName: newData.activityTypeName,
                      startTime: moment(newData.startTime).format("YYYY/MM/DD HH:mm"),
                      endTime: moment(newData.endTime).format("YYYY/MM/DD HH:mm"),
                      description: oldData.description
                  }
                    post('/log/edit', body, headers, response => {
                      this.loadHistory()
                      this.loadDashBoard()
                    }, err => {
                      console.log(err)
                      alert("Edit log failed")
                    })
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
export default History