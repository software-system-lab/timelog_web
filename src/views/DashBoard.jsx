import React, { Component } from "react"
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import { connect } from 'react-redux';

import { ArrowDownward } from '@material-ui/icons';
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
    if (this.state.group !== prevProps.group) {
      this.props.groupList.forEach((team) => {
        this.state.group.push(team.teamName)
      })
    }
  }

  getGroupIcon = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><GroupIcon /></div>
    )
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
              chartArea: { width: '100%', height: '95%', left: '5%', right: '5%' },
              title: 'DashBoard',
              tooltip: { trigger: 'none' },
              legend: { position: 'left' },
              legendTextStyle: { color: white },
              backgroundColor: 'transparent',
              color: white
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <div className="table">
          <MaterialTable title=""
            icons={tableIcons}
            columns={[
              this.props.isPersonal ?
              { headerStyle: {padding: 5, borderRight: '1px solid rgba(224, 224, 224, 1)', maxWidth: '5%'}, cellStyle: {padding: 5, borderRight: '1px solid rgba(224, 224, 224, 1)', maxWidth: '5%'}, align: 'center', render: rowData => this.state.group.includes(rowData.activityTypeName) ? this.getGroupIcon() : "" } : { hidden: true },
              { headerStyle: {padding: '10px 0px 10px 10px'}, cellStyle: {padding: '10px 0px 10px 10px'}, title: "Activity Type", field: "activityTypeName", backgroundColor: '#3C3D42' },
              { headerStyle: {padding: '10px 0px 10px 10px'}, cellStyle: {padding: '10px 0px 10px 10px'}, title: "Spent Time", field: "timeLength", defaultSort: 'desc' },
              { headerStyle: {padding: '10px 0px 10px 10px'}, cellStyle: {padding: '10px 0px 10px 10px'}, title: "Percentage", field: "percentage" },
            ]}
            data={this.props.tableData}
            sortDirection={"timeLength"}
            options={{
              search: false,
              paging: false,
              toolbar: false,
              sorting: true,
              tableLayout: "auto",
              headerStyle: {
                background: "#EEEEEE",
                color: 'black!important'
              },
            }}
            style={{
              border: '4px solid #777777',
              borderRadius: 3
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
