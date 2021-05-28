import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {shallow, configure, mount} from 'enzyme';
import { MemoryRouter, Route } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from '../../../src/views/Sidebar'
import App from '../../../src/App'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../../src/redux/reducer';

const store = createStore(
  rootReducer
)

const API_HOST = "http://localhost"

const server = setupServer(
    rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
        const other = 5;
        const labDuty = 5;
        return res(ctx.json({
            activityTypeList: [
              {
                "id": "activity0",
                "name": "LabDuty",
                "enable": true,
                "private": false
              },
              {
                "id": "activity1",
                "name": "LabProject",
                "enable": true,
                "private": false
              },
              {
                "id": "activity2",
                "name": "Other",
                "enable": true,
                "private": false
              }]
        }))
    }),
    rest.post(API_HOST + '/dash-board/spent-time', (req, res, ctx) => {
        const other = 5;
        const labDuty = 5;
        return res(ctx.json({
            dataMap: {
                LabDuty: {
                    hour: labDuty,
                    minute: 0,
                    timeLength: labDuty
                },
                Other: {
                    hour: other,
                    minute: 0,
                    timeLength: other
                }
            },
            totalTime: "10:00"
        }))
    }),
    rest.post(API_HOST +'/log/history', (req, res, ctx) => {
        return res(ctx.json({
            logItemList: [
                {
                    activityTypeName: "LabDuty",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop",
                }
            ]
        }))
    })

)

beforeAll(() => {
    process.env.REACT_APP_HOST = API_HOST
    return server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

configure({adapter: new Adapter()});


test('add log pop up', async () => {
  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  )

  fireEvent.click(screen.getByTestId('add-log-button'))

  await waitFor(() => screen.getByTestId('add-log-pop-up'))

  expect(screen.getByTestId('add-log-pop-up')).toBeVisible()

})

test('add log cancel', async () => {
  const sidebar = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

  sidebar.find('#add-log-button').first().simulate('click')

  expect(screen.getByTestId('add-log-pop-up')).toBeVisible()

  expect(screen.getByTestId('add-log-dialog-title')).toBeVisible()

  fireEvent.click(screen.getByTestId('cancel-button'))

  expect(screen.getByTestId('add-log-dialog-title')).not.toBeVisible()
})

test('stopwatch pop up', async () => {
  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  )

  fireEvent.click(screen.getByTestId('stopwatch-button'))

  await waitFor(() => screen.getByTestId('stopwatch-pop-up'))

  expect(screen.getByTestId('stopwatch-pop-up')).toBeVisible()

})

test('close stopwatch', async () => {
  const sidebar = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

  sidebar.find('#stopwatch-button').first().simulate('click')

  expect(screen.getByTestId('stopwatch-pop-up')).toBeVisible()

  fireEvent.click(screen.getByTestId('stopwatch-close'))

  expect(screen.getByTestId('stopwatch-close')).not.toBeVisible()
})

test('duration pop up', async () => {

  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  )

  fireEvent.click(screen.getByTestId('duration-button'))

  await waitFor(() => screen.getByTestId('duration-pop-up'))

  expect(screen.getByTestId('duration-pop-up')).toBeVisible()

})

test('close duration', async () => {
  const sidebar = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );

  sidebar.find('#duration-button').first().simulate('click')

  expect(screen.getByTestId('duration-pop-up')).toBeVisible()

  fireEvent.click(screen.getByTestId('duration-close'))

  expect(screen.getByTestId('duration-title')).not.toBeVisible()
})

test('ClickBoard', () => {
  render(
    <Provider store = {store}>
      <MemoryRouter>
        <Route path="/" component={App}/>
      </MemoryRouter>
    </Provider>
  )


  fireEvent.click(screen.getByTestId('board-button'))

  expect(screen.getByTestId('board')).toBeInTheDocument();

});

test('ClickHistory', () => {
  render(
    <Provider store = {store}>
      <MemoryRouter>
        <Route path="/" component={App}/>
      </MemoryRouter>
    </Provider>
  )

  fireEvent.click(screen.getByTestId('history-button'))

  expect(screen.getByTestId('history')).toBeInTheDocument();

});

test('ClickActivity', () => {
  render(
    <Provider store = {store}>
      <MemoryRouter>
        <Route path="/" component={App}/>
      </MemoryRouter>
    </Provider>
  )

  fireEvent.click(screen.getByTestId('activity-button'))

  expect(screen.getByTestId('activity')).toBeInTheDocument();

});