import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core'
import Chart from "react-google-charts";
import GetAppIcon from '@material-ui/icons/GetApp';
import { withKeycloak } from '@react-keycloak/web'
import "./Board.css";
import Export from '../export/export.js'
import { connect } from 'react-redux'

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
    return (
        <div>
          <div ref={ (element) => {this.reportElement = element} }>
            <h1 className="board-title">
              Dash Board
            </h1>
            <h3 className="board-spent-time">
              Spent Time : {this.props.dashBoardData.totalTime}
            </h3>
            <div className="board-split"></div>
            <Chart
              minWidth={''}
              width={'100%'}
              height={'35vh'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={this.props.dashBoardData.pieData}
              options={{
                chartArea: { width: '100%', height: '100%', left: '5%'},
                title: 'DashBoard',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
          <Button startIcon={<GetAppIcon/>}
            className="export-button"
            onClick={ this.exportReport }
            variant="outlined">
            Export
          </Button>
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
