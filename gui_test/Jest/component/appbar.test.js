import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter, Route } from "react-router-dom";
import Appbar from '../../../src/views/Appbar'
import App from '../../../src/App'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../../src/redux/reducer';

const store = createStore(
  rootReducer
)

test('Appbar timelog icon', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Route path="/" component={App}/>
      </MemoryRouter>
    </Provider>
  )

  fireEvent.click(screen.getByTestId('timelog-btn'))

  expect(screen.getByTestId('welcome')).toBeInTheDocument();


  await sleep(1000)

})

test('Appbar profile icon', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Route path="/" component={App}/>
      </MemoryRouter>
    </Provider>
  )

  fireEvent.click(screen.getByTestId('profile-btn'))

  expect(screen.getByTestId('profile')).toBeInTheDocument();


  await sleep(1000)

})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}