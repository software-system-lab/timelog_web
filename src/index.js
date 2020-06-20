import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import myMiddleware from './middleware'

// import './assets/css/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/css/animate.min.css';
// import './assets/sass/light-bootstrap-dashboard.css';
// import './assets/css/demo.css';
// import './assets/css/pe-icon-7-stroke.css';
// import 'mdbootstrap/css/mdb.min.css';
// import 'mdbootstrap/css/style.css';
// import 'mdbootstrap/css/addons/datatables.min.css'

const myStore = createStore(
  rootReducer,
  applyMiddleware(myMiddleware)
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <BrowserRouter>
        <Route path="/" component={App}/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
