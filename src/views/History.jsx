import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
import { forwardRef } from 'react';

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
    render() {
      return (
        <div>
          <MaterialTable title="Log History" 
            icons={tableIcons}
            columns={[
              { title: "Title", field: "title" },
              { title: "Activity Type", field: "activityType" },
              { title: "Start Time", field: "startTime" },
              { title: "End Time", field: "endTime" }
            ]}
            data={[
              { title: "Course", activityType: "OOAD", startTime: "2020-06-05 16:00", endTime: "2020-06-05 17:00" },
              { title: "Work", activityType: "OIS", startTime: "2020-06-07 10:00", endTime: "2020-06-07 12:00" },
              { title: "Planning", activityType: "OIS", startTime: "2020-06-07 13:00", endTime: "2020-06-07 15:00" },
            ]}
            options={{ 
              search: true,
            }}
          />
        </div>
      );
    }
  }

export default withRouter(History)