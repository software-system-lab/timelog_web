import React, { Component } from "react"
import MaterialTable from "material-table";
import { Input } from "@material-ui/core";
import { forwardRef } from 'react';

import { ArrowDownward } from '@material-ui/icons';
import Chart from "react-google-charts";
import "./Board.css";



const tableIcons = {
    SortArrow: forwardRef((props, ref) => <ArrowDownward style={{color: "#fff"}} {...props} ref={ref} />)
  };

class DashBoard extends Component {
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
    const { classes } = this.props;
    const white = '#FFFFFF';
    return (
 
        <div className="board-split">
              <div className="chart">
                <Chart
                  minWidth={''}
                  width={'99%'}
                  height={'50vh'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={this.props.pieData}
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
                  data={this.props.tableData}
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
    )
  }
}

export default DashBoard
