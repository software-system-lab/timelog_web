import React from 'react'
import { Button, withStyles, Tooltip, Popover } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import Export from '../export/export.js';

import htmlImg from '../img/html.svg'
import jsonImg from '../img/json.svg'
import xlsImg from '../img/xls.svg'

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
      showTooltip: false
    }
  }

  clickExportReport(event) {
    this.setState({ exportOptAnchorEl: event.currentTarget })
    console.log(this.exportOptAnchorEl)
  }

  exportAsHtml() {
    console.log('export as html')
    let clonedNode = this.props.targetEl.cloneNode(true)

    let unwantedElements = clonedNode
      .firstElementChild
      .querySelectorAll('#export-delete')

    unwantedElements.forEach(el => { el.outerHTML = '' })

    Export.exportHTML(clonedNode)
  }

  exportAsJson() {
    console.log('export as json')
  }

  exportAsExcel() {
    console.log('export as excel')
  }

  closeExportOption() {
    this.setState({ exportOptAnchorEl: null })
  }

  render() {
    const { classes } = this.props

    return (
      <Tooltip
        arrow
        title={<p style={{ fontSize: '1.2em', color: 'white' }}>Zoom the web browser to 100% for better result</p>}
        open={!this.state.exportOptAnchorEl && this.state.showTooltip}
      >
        <div>
          <Button
            onClick={this.clickExportReport}
            startIcon={<GetAppIcon />}
            variant="outlined"
            className={classes.exportButton}
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
            <div className={classes.exportFormatList}>
              <div
                className={classes.exportFormatOption}
                onClick={this.exportAsHtml}
              >
                <img src={htmlImg} className={classes.exportOptionIcon} />
                <span className={classes.exportOptionText}>HTML</span>
              </div>
              <div
                className={classes.exportFormatOption}
                onClick={this.exportAsJson}
              >
                <img src={jsonImg} className={classes.exportOptionIcon} />
                <span className={classes.exportOptionText}>JSON</span>
              </div>
              <div
                className={classes.exportFormatOption}
                onClick={this.exportAsExcel}
              >
                <img src={xlsImg} className={classes.exportOptionIcon} />
                <span className={classes.exportOptionText}>EXCEL</span>
              </div>
            </div>
          </Popover>
        </div>
      </Tooltip>
    )
  }
}

export default withStyles(useStyles, { withTheme: false })(DashboardExporter)