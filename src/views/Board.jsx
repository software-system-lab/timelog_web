import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core'
import Chart from "react-google-charts";
import GetAppIcon from '@material-ui/icons/GetApp';
import "./Board.css";
import Export from '../export/export.js'

class Board extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalTime: "00:00"
    }
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
              Spent Time : {this.state.totalTime}
            </h3>
            <div className="board-split"></div>
            <Chart
              minWidth={''}
              width={'100%'}
              height={'35vh'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7],
              ]}
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

export default withRouter(Board)