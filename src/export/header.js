function html (content) {
  return `
  <html lang="en"
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>timelog</title>
    <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="/js/app.js" rel="preload" as="script"><link href="/js/chunk-vendors.js" rel="preload" as="script"><style type="text/css">
    <style type="text/css">
      html, body {
        height: 100%;
        margin: 0;
      }
      body {
        background-color: #3C3D42;
      }
      tr {
        color: #FFFFFF;
      }
      .board-text {
        text-align: center;
        color: #FFFFFF;
      }
      .board-split {
        margin-top: 50px;
      }
      .export-button {
        position: absolute;
        left: 0;
      }
      .table {
        color: #FFFFFF;
      }
      .team-member-board {
        height: 45vh;
        background-color: #ffffff0c;
        border-width: 2pt;
        border-color: #ffffff80;
        border-style:dashed;
        border-radius: 10px;
        margin: 20px 0;
      }
      
      .team-member-board .chart {
          width: 50%;
      }
      
      .team-member-board h2{
          margin:50px;
          color:#FFFFFF;
      }
    </style>
    <style type="text/css">/* Chart.js */
    /*
    * DOM element rendering detection
    * https://davidwalsh.name/detect-node-insertion
    */
    @keyframes chartjs-render-animation {
    from { opacity: 0.99; }
    to { opacity: 1; }
    }

    .chartjs-render-monitor {
    animation: chartjs-render-animation 0.001s;
    }

    /*
    * DOM element resizing detection
    * https://github.com/marcj/css-element-queries
    */
    .chartjs-size-monitor,
    .chartjs-size-monitor-expand,
    .chartjs-size-monitor-shrink {
    position: absolute;
    direction: ltr;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
    z-index: -1;
    }

    .chartjs-size-monitor-expand > div {
    position: absolute;
    width: 1000000px;
    height: 1000000px;
    left: 0;
    top: 0;
    }

    .chartjs-size-monitor-shrink > div {
    position: absolute;
    width: 200%;
    height: 200%;
    left: 0;
    top: 0;
    }
    </style>
    <style data-jss="" data-meta="MuiTable">
.MuiTable-root {
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
}
.MuiTable-root caption {
  color: rgba(0, 0, 0, 0.54);
  padding: 16px;
  font-size: 0.875rem;
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  caption-side: bottom;
  letter-spacing: 0.01071em;
}
.MuiTable-stickyHeader {
  border-collapse: separate;
}
</style>
<style data-jss="" data-meta="MuiTableBody">
.MuiTableBody-root {
  display: table-row-group;
}
</style>
<style data-jss="" data-meta="MuiTableCell">
.MuiTableCell-root {
  display: table-cell;
  padding: 16px;
  font-size: 0.875rem;
  text-align: left;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  border-bottom: 1px solid
    rgba(224, 224, 224, 1);
  letter-spacing: 0.01071em;
  vertical-align: inherit;
}
.MuiTableCell-head {
  color: #FFFFFF;
  font-weight: 500;
  line-height: 1.5rem;
}
.MuiTableCell-body {
  color: #FFFFFF;
}
.MuiTableCell-footer {
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.75rem;
  line-height: 1.3125rem;
}
.MuiTableCell-sizeSmall {
  padding: 6px 24px 6px 16px;
}
.MuiTableCell-sizeSmall:last-child {
  padding-right: 16px;
}
.MuiTableCell-sizeSmall.MuiTableCell-paddingCheckbox {
  width: 24px;
  padding: 0 12px 0 16px;
}
.MuiTableCell-sizeSmall.MuiTableCell-paddingCheckbox:last-child {
  padding-left: 12px;
  padding-right: 16px;
}
.MuiTableCell-sizeSmall.MuiTableCell-paddingCheckbox > * {
  padding: 0;
}
.MuiTableCell-paddingCheckbox {
  width: 48px;
  padding: 0 0 0 4px;
}
.MuiTableCell-paddingCheckbox:last-child {
  padding-left: 0;
  padding-right: 4px;
}
.MuiTableCell-paddingNone {
  padding: 0;
}
.MuiTableCell-paddingNone:last-child {
  padding: 0;
}
.MuiTableCell-alignLeft {
  text-align: left;
}
.MuiTableCell-alignCenter {
  text-align: center;
}
.MuiTableCell-alignRight {
  text-align: right;
  flex-direction: row-reverse;
}
.MuiTableCell-alignJustify {
  text-align: justify;
}
.MuiTableCell-stickyHeader {
  top: 0;
  left: 0;
  z-index: 2;
  position: sticky;
  background-color: #fafafa;
}

</style>
<style data-jss="" data-meta="MuiSvgIcon">
svg.MuiSvgIcon-root {
  fill: white;
  width: 2em;
  hight: 2em;
}
</style>

</style>
<style data-jss="" data-meta="MuiTableFooter">
.MuiTableFooter-root {
  display: table-footer-group;
}
</style>
<style data-jss="" data-meta="MuiTableHead">
.MuiTableHead-root {
  display: table-header-group;
}
</style>
<style data-jss="" data-meta="MuiTableRow">
.MuiTableRow-root {
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;
}
.MuiTableRow-root.MuiTableRow-hover:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
.MuiTableRow-root.Mui-selected, .MuiTableRow-root.Mui-selected:hover {
  background-color: rgba(245, 0, 87, 0.08);
}
</style>
<style data-jss="" data-meta="MuiTableSortLabel">
.MuiTableSortLabel-root {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  flex-direction: inherit;
  justify-content: flex-start;
}
.MuiTableSortLabel-root:focus {
  color: rgba(0, 0, 0, 0.54);
}
.MuiTableSortLabel-root:hover {
  color: #FFFFFF;
}
.MuiTableSortLabel-root.MuiTableSortLabel-active {
  color: #FFFFFF;
}
.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon {
  color: #FFFFFF;
  opacity: 0;
}
.MuiTableSortLabel-root:hover .MuiTableSortLabel-icon {
  opacity: 0;
  color: #FFFFFF;
}
.MuiTableSortLabel-icon {
  opacity: 0;
  font-size: 18px;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  margin-left: 4px;
  user-select: none;
  margin-right: 4px;
  color: inherit !important;
}
.MuiTableSortLabel-iconDirectionDesc {
  opacity: 0;
  transform: rotate(0deg);
}
.MuiTableSortLabel-iconDirectionAsc {
  opacity: 0;
  transform: rotate(180deg);
}
table {
  border: solid;
  border-color: #FFFFFF;
  color: #FFFFFF;
}
tr {
  color: #FFFFFF;
}
.board-text {
  text-align: center;
}
.board-split {
  display: flex;
  flex-direction: row;
  margin-top: 50px; 
}
.export-button {
  position: absolute;
  left: 0;
}
.reactgooglegraph-1{
  width: 80%;
}
.chart{
  width: 50%;
}
.table{
  margin-left: 5%;
  width: 40%;
}

</style>
  </head>
  <body>
  ${content}
  </body>
  </html>`
}

export default html
