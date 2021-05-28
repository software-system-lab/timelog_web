import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Duration from '../../../src/views/Duration'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


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
                    timeLength: labDuty
                },
                Other: {
                    timeLength: other
                }
            },
            totalTime: labDuty + other
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
    }),
    rest.post(API_HOST +'/log/record', (req, res, ctx) => {
        return res(ctx.json({
            logID: "logid-12345"
        }))
    })

)

configure({adapter: new Adapter()});

beforeAll(() => {
    process.env.REACT_APP_HOST = API_HOST
    return server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('duration normal', async () => {
  let closeCount = 0

  const duration = mount(<Duration open={true}
            testMode={true}
            handleClose={() => {closeCount += 1}}
            updateDates={() => {}}
            updateHistory={() => {}}
            updateDashBoard={() => {}}/>)

  duration.find('#duration-title')

  expect(screen.getByTestId('duration-title')).toBeVisible()

  fireEvent.change(screen.getByTestId('start-date-pick').childNodes[1].childNodes[0], { target: { value: '2021/05/12' } })

  fireEvent.change(screen.getByTestId('end-date-pick').childNodes[1].childNodes[0], { target: { value: '2021/05/12' } })

  fireEvent.click(screen.getByTestId('submit-button'))

  await waitFor(() => expect(closeCount).toBe(1))
})