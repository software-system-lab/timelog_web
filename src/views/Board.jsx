import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core';
import Chart from "react-google-charts";
import GetAppIcon from '@material-ui/icons/GetApp';
import { withKeycloak } from '@react-keycloak/web';
import "./Board.css";
import Export from '../export/export.js';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import moment from "moment";

class Board extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
  }

  exportReport() {
    Export.exportHTML(this.reportElement)
  };

  render() {
    const white = '#FFFFFF';
    return (
        <div>
          <div className="export-button">
            <Button startIcon={<GetAppIcon/>}
              onClick={ this.exportReport }
              variant="outlined"
              style={{color: white, borderColor: white}}>
              Export
            </Button>
          </div>
          <div ref={ (element) => {this.reportElement = element} }>
            <h1 className="board-title board-text">
              {`${this.props.keycloak.idTokenParsed.name}'s Dashboard`}
            </h1>
            <h2 className="board-duration board-text">
              {moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")}
               ~
              {moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")}
            </h2>
            <h3 className="board-spent-time board-text">
              Spent Time : {this.props.dashBoardData.totalTime}
            </h3>
            <div className="board-split">
              <div class="chart">
                <Chart
                  minWidth={''}
                  width={'95%'}
                  height={'40vh'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={this.props.dashBoardData.pieData}
                  options={{
                    chartArea: { width: '80%', height: '95%', left: '15%',right: '5%'},
                    title: 'DashBoard',
                    tooltip: { trigger:'none'},
                    legend: {position: 'left'},
                    legendTextStyle: {color:white},
                    backgroundColor: '#3C3D42',
                    color: white
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </div>
              <div class="table">
                <MaterialTable title=""
                  columns={[
                    { title: "Activity Type", field: "activityTypeName", backgroundColor: '#3C3D42'},
                    { title: "Spent Time", field: "timeLength" },
                    { title: "Percentage", field: "percentage" },
                  ]}
                  data={this.props.dashBoardData.tableData}
                  options={{
                    search: false,
                    paging: false,
                    toolbar: false,
                    sorting: false,
                    tableLayout: "fixed"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    dashBoardData: state.dashBoardData
  }
}

export default connect(mapStateToProps, null)(withRouter(withKeycloak(Board)))
