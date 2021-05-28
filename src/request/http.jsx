import axios from 'axios'

export const post = (route, body, headers, callback, errCallback) => {
    axios.post(process.env.REACT_APP_HOST + route, body, { headers: headers})
    .then(callback)
    .catch(errCallback)
}
