import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import { withKeycloak } from '@react-keycloak/web'
import axios from 'axios'
import moment from 'moment'

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
      super(props);
      const { keycloak } = props;
      this.keycloak = keycloak;
      this.state = {
        logList: []
      }
    }

    componentDidMount() {
      this.reload();
    }

    reload() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': this.keycloak.token
      }
      const body = {
        userID: this.keycloak.subject,
        startDate: moment(localStorage.getItem("startDate")).format("YYYY/MM/DD"),
        endDate: moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")
      }

      axios.post(process.env.REACT_APP_HOST + '/log/history', body, { headers: headers })
      .then( response => {
        this.setState({
          logList: response.data.logItemList
        })
      })
      .catch( err => {
        console.log(err);
        alert('Get history failed');
      })
    }

    render() {
      return (
        <div>
          <MaterialTable title="Log History"
            icons={tableIcons}
            columns={[
              { title: "Title", field: "title" },
              { title: "Activity Type", field: "activityTypeName" },
              { title: "Start Time", field: "startTime" },
              { title: "End Time", field: "endTime" }
            ]}
            data={this.state.logList}
            options={{
              search: true,
            }}
          />
        </div>
      );
    }
  }

export default withRouter(withKeycloak(History))
