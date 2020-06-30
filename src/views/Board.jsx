import React, { Component } from "react"
import { withRouter } from "react-router-dom";
import { Button } from '@material-ui/core'
import Chart from "react-google-charts";
import GetAppIcon from '@material-ui/icons/GetApp';
import { withKeycloak } from '@react-keycloak/web'
import "./Board.css";
import Export from '../export/export.js'
import axios from 'axios'
import moment from 'moment'

class Board extends Component {

  constructor(props) {
    super(props)
    const { keycloak } = props;
    this.keycloak = keycloak;
    this.state = {
      totalTime: "00:00",
      pieData: [
        ['Task', 'Hours per Day']
      ]
    }
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
  }

  componentDidMount() {
    this.reload();
  }

  exportReport() {
    Export.exportHTML(this.reportElement)
  };

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

    axios.post(process.env.REACT_APP_HOST + '/dash-board/spent-time', body, { headers: headers })
    .then( response => {
      const pieData = [
        ['Task', 'Hours per Day']
      ]
      const dataMap = response.data.dataMap
      console.log(response.data.dataMap)
      Object.keys(dataMap).forEach((key) => {
        pieData.push([key, dataMap[key].timeLength])
      })
      this.setState({
        totalTime: response.data.totalTime,
        pieData: pieData
      })
    })
    .catch( err => {
      console.log(err);
      alert('Get spent time failed');
    })
  }

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
              data={this.state.pieData}
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

export default withRouter(withKeycloak(Board))
