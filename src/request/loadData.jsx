import {post} from './http'
import moment from 'moment'

function getBody(userID) {
    return ({
        userID: userID
    })
}

export const load_history = (userID, callback, errCallback) => {
    const headers = {}
    const body = getBody(userID)
    body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
    body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")

    post('/log/history', body, headers, callback, errCallback)
}

export const load_dash_board = (userID, filterList, callback, errCallback) => {
    const headers = {}
    const body = getBody(userID)
    body.filterList = filterList
    body.startDate = moment(localStorage.getItem("startDate")).format("YYYY/MM/DD")
    body.endDate = moment(localStorage.getItem("endDate")).format("YYYY/MM/DD")
    
    post('/dash-board/spent-time', body, headers, callback, errCallback)
}

export const load_activity_type_list = (userID, callback, errCallback) => {
    const headers = {}
    const body = getBody(userID)
    post('/activity/all', body, headers, callback, errCallback)
}