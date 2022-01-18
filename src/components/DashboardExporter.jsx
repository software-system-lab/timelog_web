import React from 'react'
import { Button, withStyles, Tooltip, Popover, Avatar } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import Export from '../export/export.js';
import './DashboardExporter.css'

import htmlImg from '../img/html.svg'
import xlsImg from '../img/xls.svg'
import { connect } from 'react-redux';

const useStyles = () => ({
  exportButton: {
    color: 'white',
    border: 'white 1px solid',
    width: '120px'
  },
  exportFormatList: {
    padding: '5px',
  },
  exportFormatOption: {
    display: 'flex',
    width: '120px',
    alignItems: 'center',
    paddingRight: '10px',
    borderRadius: '5px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#e3e3e3'
    }
  },
  exportOptionIcon: {
    width: 24,
    height: 24,
    margin: 9
  }
})

class DashboardExporter extends React.Component {
  constructor(props) {
    super(props)
    this.clickExportReport = this.clickExportReport.bind(this)
    this.exportAsHtml = this.exportAsHtml.bind(this)
    this.exportAsJson = this.exportAsJson.bind(this)
    this.exportAsExcel = this.exportAsExcel.bind(this)
    this.closeExportOption = this.closeExportOption.bind(this)


    this.state = {
      exportOptAnchorEl: null,
      showTooltip: false,
    }
  }

  clickExportReport(event) {
    this.setState({ exportOptAnchorEl: event.currentTarget })
  }

  exportAsHtml() {
    console.log('export as html')
    let clonedNode = this.props.targetEl.cloneNode(true)

    let unwantedElements = clonedNode
      .firstElementChild
      .querySelectorAll('#export-delete')

    unwantedElements.forEach(el => { el.outerHTML = '' })

    Export.exportHTML(clonedNode, this.props.operatedTeam.teamName)
  }

  exportAsJson() {
    console.log('export as json')
  }

  exportAsExcel() {
    console.log('export as excel')
    Export.exportExcel(this.props.exportExcelData, this.props.operatedTeam.teamName)
  }

  closeExportOption() {
    this.setState({ exportOptAnchorEl: null })
  }

  buildOptionButtonIcon(srcImg) {
    return <Avatar src={srcImg} style={{ width: 24, height: 24 }} variant="square" /> 
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.clickExportReport}
          startIcon={<GetAppIcon />}
          variant="outlined"
          className="export-button"
          onMouseEnter={() => this.setState({ showTooltip: true })}
          onMouseLeave={() => this.setState({ showTooltip: false })}
        >
          Export
        </Button>
        <Popover
          open={!!this.state.exportOptAnchorEl}
          anchorEl={this.state.exportOptAnchorEl}
          onClose={this.closeExportOption}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div className="export-format-list">
            <Tooltip
              arrow
              title={<p style={{ fontSize: '1.2em', color: 'white' }}>Zoom the web browser to 100% for better result</p>}
            >
              <Button
                className="export-format-option"
                onClick={this.exportAsHtml}
                startIcon={this.buildOptionButtonIcon(htmlImg)}
                style={{ justifyContent: 'space-around' }}
              >
                <span className="export-option-text">HTML</span>
              </Button>
            </Tooltip>
            {/* <Button
              className="export-format-option"
              onClick={this.exportAsJson}
              startIcon={this.buildOptionButtonIcon(jsonImg)}
              style={{ justifyContent: 'space-around' }}
            >
              <span className="export-option-text">JSON</span>
            </Button> */}
            <Button
              className="export-format-option"
              onClick={this.exportAsExcel}
              startIcon={this.buildOptionButtonIcon(xlsImg)}
              style={{ justifyContent: 'space-around' }}
            >
              <span className="export-option-text">EXCEL</span>
            </Button>
          </div>
        </Popover>
      </div>  
    )
  }
}

function mapStateToProps(state) {
  return {
    exportExcelData: state.exportExcelData,
    operatedTeam: state.operatedTeam,
  }
}

export default withStyles(useStyles, { withTheme: false })(connect(mapStateToProps)((DashboardExporter)))