import html from './header.js'
import FileSaver from 'file-saver'
import moment from 'moment'

export default {
  exportHTML (element) {
    const completeHTML = html(element.outerHTML)
    var blob = new Blob([completeHTML], { type: 'text/plain;charset=utf-8' })
    var dateFormat = "YYYYMMDD"
    var duration = moment(localStorage.getItem("startDate")).format(dateFormat) + "_" +
                   moment(localStorage.getItem("endDate")).format(dateFormat)
    FileSaver.saveAs(blob, duration + ".html")
  }
}
