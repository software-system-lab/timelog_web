import html from './header.js'
import FileSaver from 'file-saver'
import moment from 'moment'
import XLSX from 'xlsx'

export default {
  exportHTML(element, teamName) {
    const completeHTML = html(element.outerHTML)
    var blob = new Blob([completeHTML], { type: 'text/plain;charset=utf-8' })
    var dateFormat = "YYYYMMDD"
    const startDate = moment(localStorage.getItem("startDate")).format(dateFormat)
    const endDate = moment(localStorage.getItem("endDate")).format(dateFormat)
    const unitName = teamName ? teamName : localStorage.getItem('givenName')
    const filename = `${startDate}_${endDate}_${unitName}.html`
    FileSaver.saveAs(blob, filename)
  },

  exportExcel(data, operatedTeam) {
    console.log('data', data)
    let sheets = []

    data.memberDashboardList.forEach(member => {
      let personalData = []
      
      if (Object.entries(member.dataMap).length === 0) {
        personalData.push({
          'Activity Type': '',
          'Start Time': '',
          'End Time': '',
          'Duration (hours)': ''
        })
      } else {
        Object.entries(member.dataMap).forEach(([activityType, value]) => {
          const startTime = new Date(value.startTime)
          const endTime = new Date(value.endTime)
          const dateFormat = 'YYYY/MM/DD hh:mm'
          let row = {
            'Activity Type': activityType,
            'Start Time': moment(startTime).format(dateFormat),
            'End Time': moment(endTime).format(dateFormat),
            'Duration (hours)': (value.timeLength / 60).toFixed(2)
          }
          personalData.push(row)
        })
      }

      sheets.push(XLSX.utils.json_to_sheet(personalData))
    })

    // prepare a new workbook
    let wb = XLSX.utils.book_new()

    // add sheets into workbook
    sheets.forEach((s, idx) => {
      XLSX.utils.book_append_sheet(wb, s, data.memberDashboardList[idx].username)
    })

    // output file
    var dateFormat = 'YYYYMMDD'
    const startDate = moment(localStorage.getItem('startDate')).format(dateFormat)
    const endDate = moment(localStorage.getItem('endDate')).format(dateFormat)
    const filename = `${startDate}_${endDate}_${operatedTeam}.xlsx` 

    XLSX.writeFile(wb, filename)
  }
}
