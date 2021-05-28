import React, { Component, forwardRef } from "react";
import { Button } from '@material-ui/core';
import Chart from "react-google-charts";
import GetAppIcon from '@material-ui/icons/GetApp';
import FilterListIcon from '@material-ui/icons/FilterList';
import "./Board.css";
import Export from '../export/export.js';
import MaterialTable from "material-table";
import Popover from '@material-ui/core/Popover';
import moment from "moment";
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { ArrowDownward } from '@material-ui/icons';
import {load_dash_board} from '../request/loadData'

const useStyles = (theme) => ({
  root: {
    width : '100%',
    maxWidth: '32vw',
    flexGrow: 1
  },
  exportText: {
    fontSize: '10pt',
    color:'#FFFFFF',
    opacity: 0
  },
  exportButton: {
    position: 'absolute',
    top: '5%',
    '&:hover p': { 
      opacity: 1,
    }
  }
});

const tableIcons = {
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />)
};

function paddingLeft (str, len) {
  if (str.toString().length >= len) {
    return str
  } else {
    return paddingLeft('0' + str, len)
  }
}

function getHour (time) {
  return paddingLeft(Math.floor(time / 60), 2)
}

function getMinute (time) {
  return paddingLeft((time % 60).toFixed(0), 2)
}

function parsePieData(dataMap) {
  const pieData = [
      ['Task', 'Hours per Project']
  ]
  Object.keys(dataMap).forEach((key) => {
      const timeLength = dataMap[key].timeLength
      pieData.push([key, timeLength])
  })
  return pieData
}

function parseTableData(totalTimeString, dataMap) {
  const totalTime = parseInt(totalTimeString.split(":")[0]) * 60 + parseInt(totalTimeString.split(":")[1])

  const tableData = []
  Object.keys(dataMap).forEach((key) => {
      const timeLength = dataMap[key].timeLength
      const percentage = totalTime === 0 ? 0 : (timeLength / totalTime * 100).toFixed(2).toString()
      tableData.push({
        activityTypeName: key, 
        timeLength: getHour(timeLength) + " : " + getMinute(timeLength), 
        percentage: percentage.toString() + " %"
      })
  })
  return tableData
}

class Board extends Component {
  
  constructor(props) {
    super(props)
    this.exportReport = this.exportReport.bind(this)
    this.render = this.render.bind(this)
    this.handleInputChange= this.handleInputChange.bind(this);
    this.handleSelectAll= this.handleSelectAll.bind(this);
    this.submit = this.submit.bind(this)
    this.initialize = this.initialize.bind(this)
    this.state = { 
      anchorEl: null, 
      open: false,
      flag: true,
      filterList: [],
      select: false,
    };
  }

  loadDashBoard(filterList=null) {
    load_dash_board(localStorage.getItem("uid"), filterList, response => {
        this.props.updateBoard(response.data)
    }, err => {
      console.log(err)
      alert('Get dash board data failed')
    })
  }

  componentDidMount() {
    this.loadDashBoard()
  }

  exportReport() {
    Export.exportHTML(this.reportElement)
  }

  flipOpen = () => this.setState({ ...this.state, open: !this.state.open });

  handleClick = event => {
    this.initialize();
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
  };
  
  handleProfileClose = event => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
  };

  handleInputChange(event) {   
    for(const each of this.props.activityData.activityTypeList) {
        if( each.name === event.target.value) {
          each.checked = event.target.checked;
        }
        if(each.checked === false) {
          this.setState({ select: false})
        }
    }
    for(const each of this.props.activityData.activityTypeList) {
      if(each.checked === true) {
        this.setState({ select: true})
      } else {
        this.setState({ select: false})
        break
      }
    }
  }

  handleSelectAll(event) {
    if( this.state.select === false) {
      for(const each of this.props.activityData.activityTypeList) {
          each.checked = true;
        }
        this.setState({select: true});
      }else {
        for(const each of this.props.activityData.activityTypeList) {
          each.checked = false;
        }
        this.setState({select: false})
      }
  }

  initialize() {
    for(const each of this.props.activityData.activityTypeList) {
      each.checked = false;
    }
    this.setState({select: false})
  }

  submit() {
    this.setState({ filterList: [] });
    for(const each of this.props.activityData.activityTypeList){
      if( each.checked === true){
        this.state.filterList.push(each.name)
      }
    }
    this.loadDashBoard(this.state.filterList) 
  }

  render() {
    const { classes } = this.props;
    const white = '#FFFFFF';
    return (
        <div data-testid='board' id='board'>
          <div className={classes.exportButton}>
            <Button startIcon={<GetAppIcon/>}
              onClick={ this.exportReport }
              variant="outlined"
              style={{color: white, borderColor: white, marginLeft:35}} data-testid="export-button" id="export-button">
              Export
            </Button>
            <p className={classes.exportText}>
                Please adjust the web browser<br></br>
                zoom to 100% for better result
            </p>
          </div>
          <div className="selector-button">
            <Button id="filter-button" 
              onClick={event => this.handleClick(event)}
              startIcon={<FilterListIcon/>}
              variant="outlined"
              style={{color: white, borderColor: white, marginLeft:35}}
            >
              Filter
            </Button>
            <div className="popover">
              <Popover 
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleProfileClose}
                id='filter-pop-up'
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                style={{
                  width: '150%',
                  height: '150%',
                }}
              >
                <div className="filter-list">
                  <Checkbox id="Select-all-checkbox" data-testid="Select-all-checkbox" checked={this.state.select} onChange={this.handleSelectAll}></Checkbox>
                  Select All
                </div>
              {
                this.props.activityData.activityTypeList.map((activityType, key) => {
                  return (
                    <div className="filter-list" key={key}>
                      <Checkbox  value={activityType.name} checked={activityType.checked} onChange={this.handleInputChange}></Checkbox>
                      {activityType.name}

                    </div>
                    )
                  })
              } 
                <center>
                  <Button className="filter-btn" onClick={this.submit} color="secondary" data-testid='submit-btn'>
                    Submit
                  </Button>
                </center>
              </Popover>
            </div>
          </div>
          <div ref={ (element) => {this.reportElement = element} }>
            <h1 className="board-title board-text">
              {`${localStorage.getItem('displayName')}'s Dashboard`}
            </h1>
            <h2 className="board-duration board-text">
              {moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")}
               ~
              {moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")}
            </h2>
            <h3 className="board-spent-time board-text">
              Spent Time : {this.props.boardData.totalTime}
            </h3>
            <div className="board-split">
              <div className="chart">
                <Chart
                  minWidth={''}
                  width={'99%'}
                  height={'50vh'}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={parsePieData(this.props.boardData.dataMap)}
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
                  data={parseTableData(this.props.boardData.totalTime, this.props.boardData.dataMap)}
                  sortDirection={"timeLength"}
                  options={{
                    search: false,
                    paging: false,
                    toolbar: false,
                    sorting: true,
                    tableLayout: "fixed",
                    draggable: false
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

export default withStyles(useStyles,{withTheme: true})(Board)