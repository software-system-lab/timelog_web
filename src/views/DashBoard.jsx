import React, { Component } from "react"
import MaterialTable from "material-table";
import { Input } from "@material-ui/core";
import { forwardRef } from 'react';
import { connect } from 'react-redux';

import { ArrowDownward, FreeBreakfastTwoTone } from '@material-ui/icons';
import Chart from "react-google-charts";
import "./Board.css";
import GroupIcon from '@material-ui/icons/Group';



const tableIcons = {
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
  };

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: [],
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.groupList !== prevProps.groupList) {
      this.props.groupList.map((team)=>{
        this.state.group.push(team.teamName)
      })
    }
  }

  render() {
    const white = '#FFFFFF';
    return (
 
        <div className="board-split">
              <div className="chart">
                <Chart
                  minWidth={''}
                  width={'99%'}
                  height={this.props.chartArea}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={this.props.pieData}
                  options={{
                    chartArea: {width: '100%', height: '95%', left: '5%', right: '5%'},
                    title: 'DashBoard',
                    tooltip: {trigger:'none'},
                    legend: {position: 'left'},
                    legendTextStyle: {color:white},
                    backgroundColor: 'transparent',
                    color: white
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </div>
              <div className="table">
                <MaterialTable title=""
                  icons={ tableIcons }
                  columns={[
                    this.props.isPersonal?
                    { render: rowData =>this.state.group.includes(rowData.activityTypeName)?<GroupIcon/>:"" } : { hidden: true},
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

function mapStateToProps(state) {
  return {
    groupList: state.groupList,
  }
}


export default connect(mapStateToProps)(DashBoard)
