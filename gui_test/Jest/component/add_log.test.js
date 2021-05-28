import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddLog from '../../../src/views/AddLog'
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

var addlog;
beforeAll(() => {
    process.env.REACT_APP_HOST = API_HOST
    return server.listen()
})
beforeEach(() => {
    const props = {
        activityData: {
          activityTypeList: [
              {
                  "id": "activity0",
                  "name": "LabDuty",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":0 }
              }, 
              {
                  "id": "activity1",
                  "name": "LabProject",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":1 }
              }, 
              {
                  "id": "activity2",
                  "name": "Other",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":2 }
              }
          ]
        },
        open: true,
        testMode: true,
        duration: 3600,
        handleClose: () => {},
        updateHistory: () => {},
        updateBoard: () => {}
    }
    addlog = mount(<AddLog {...props} />)
})
afterEach(() => {
    server.resetHandlers()
    if (addlog) {
        addlog.unmount();
    }
})
afterAll(() => server.close())

test('add log normal', async () => {

  expect(screen.getByTestId('add-log-dialog-title')).toBeVisible()

  addlog.setState({
      title: "work",
      startTime: Date.parse("2021/05/01 00:00:00"),
      endTime: Date.parse("2021/05/01 02:00:00"),
      activityTypeName: "Default",
  })

  addlog.instance().submit()

  expect(addlog.state().title).toBe("")
  expect(addlog.state().activityTypeName).toBe("")
})

test('add log when title is empty', async () => {

  expect(screen.getByTestId('add-log-dialog-title')).toBeVisible()

  addlog.setState({
      title: "",
      startTime: Date.parse("2021/05/01 02:00:00"),
      endTime: Date.parse("2021/05/01 00:00:00"),
      activityTypeName: "Default",
  })

  addlog.instance().submit()
  expect(addlog.state().title).toBe("")
  expect(addlog.state().activityTypeName).toBe("Default")
})

test('add log when activity type is empty', async () => {

  expect(screen.getByTestId('add-log-dialog-title')).toBeVisible()

  addlog.setState({
      title: "work",
      startTime: Date.parse("2021/05/01 02:00:00"),
      endTime: Date.parse("2021/05/01 00:00:00"),
      activityTypeName: "",
  })

  addlog.instance().submit()
  expect(addlog.state().title).toBe("work")
  expect(addlog.state().activityTypeName).toBe("")
})

test('add log when end time is earlier than start time', async () => {

  addlog.setState({
      title: "work",
      startTime: Date.parse("2021/05/01 02:00:00"),
      endTime: Date.parse("2021/05/01 00:00:00"),
      activityTypeName: "Default",
  })

  addlog.instance().submit()
})

test("Load activity type list server side error", async () => {
    server.use(
        rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Load activity type list failed' })
            )
        })
    )

    addlog.unmount()

    const props = {
        activityData: {
          activityTypeList: [
              {
                  "id": "activity0",
                  "name": "LabDuty",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":0 }
              }, 
              {
                  "id": "activity1",
                  "name": "LabProject",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":1 }
              }, 
              {
                  "id": "activity2",
                  "name": "Other",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":2 }
              }
          ]
        },
        open: true,
        testMode: true,
        duration: 3600,
        handleClose: () => {},
        updateHistory: () => {},
        updateBoard: () => {}
    }
    addlog = mount(<AddLog {...props}/>)

    addlog.setState({
      title: "work",
      startTime: Date.parse("2021/05/01 02:00:00"),
      endTime: Date.parse("2021/05/01 00:00:00"),
      activityTypeName: "Default",
  })

  addlog.instance().submit()

  await sleep (1000);

})

test("Load activity type list server side", async () => {
    addlog.setState({
      title: "work",
      startTime: Date.parse("2021/05/01 02:00:00"),
      endTime: Date.parse("2021/05/01 00:00:00"),
      activityTypeName: "Default",
  })

  addlog.instance().submit()

  await sleep (1000);

})

test("Add log failed", async () => {
    server.use(
        rest.post(API_HOST + '/log/record', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Add log failed' })
            )
        })
    )

    addlog.unmount()

    const props = {
        activityData: {
          activityTypeList: [
              {
                  "id": "activity0",
                  "name": "LabDuty",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":0 }
              }, 
              {
                  "id": "activity1",
                  "name": "LabProject",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":1 }
              }, 
              {
                  "id": "activity2",
                  "name": "Other",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":2 }
              }
          ]
        },
        open: true,
        testMode: true,
        duration: 3600,
        handleClose: () => {},
        updateHistory: () => {},
        updateBoard: () => {}
    }
    addlog = mount(<AddLog {...props}/>)

    addlog.setState({
      title: "work",
      startTime: Date.parse("2021/05/01 02:00:00"),
      endTime: Date.parse("2021/05/01 05:00:00"),
      activityTypeName: "Default",
    })

    addlog.instance().submit()

    await sleep (1000);

})

test("Add log add title", async () => {
    addlog.unmount()
    addlog = null
    const props = {
        activityData: {
          activityTypeList: [
              {
                  "id": "activity0",
                  "name": "LabDuty",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":0 }
              }, 
              {
                  "id": "activity1",
                  "name": "LabProject",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":1 }
              }, 
              {
                  "id": "activity2",
                  "name": "Other",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":2 }
              }
          ]
        },
        open: true,
        testMode: true,
        duration: 3600,
        handleClose: () => {},
        updateHistory: () => {},
        updateBoard: () => {}
    }
    render(<AddLog {...props}/>)

  expect(screen.getByTestId('add-log-dialog-title')).toBeVisible()

  fireEvent.change(screen.getByLabelText('Title *'), { target: { value: 'work' } })

  await sleep (1000);

})

test ("componentDidUpdate", async () => {
    const startTime = addlog.state().startTime
    addlog.setProps({duration: 18000})
    expect(addlog.state().startTime).not.toBe(startTime)
})

test('Load history failed on submit', async () => {
    server.use(
        rest.post(API_HOST +'/log/history', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Add log failed' })
            )
        })
    )

    addlog.unmount()

    const props = {
        activityData: {
          activityTypeList: [
              {
                  "id": "activity0",
                  "name": "LabDuty",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":0 }
              }, 
              {
                  "id": "activity1",
                  "name": "LabProject",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":1 }
              }, 
              {
                  "id": "activity2",
                  "name": "Other",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":2 }
              }
          ]
        },
        open: true,
        testMode: true,
        duration: 3600,
        handleClose: () => {},
        updateHistory: () => {},
        updateBoard: () => {}
    }
    addlog = mount(<AddLog {...props}/>)

    addlog.setState({
        title: "work",
        startTime: Date.parse("2021/05/01 02:00:00"),
        endTime: Date.parse("2021/05/01 05:00:00"),
        activityTypeName: "Default",
    })

    addlog.instance().submit()

    await sleep (1000);
})

test('Load dashboard failed on submit', async () => {
    server.use(
        rest.post(API_HOST +'/dash-board/spent-time', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Add log failed' })
            )
        })
    )

    addlog.unmount()

    const props = {
        activityData: {
          activityTypeList: [
              {
                  "id": "activity0",
                  "name": "LabDuty",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":0 }
              }, 
              {
                  "id": "activity1",
                  "name": "LabProject",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":1 }
              }, 
              {
                  "id": "activity2",
                  "name": "Other",
                  "enable": true,
                  "private": false,
                  "tableData": { "id":2 }
              }
          ]
        },
        open: true,
        testMode: true,
        duration: 3600,
        handleClose: () => {},
        updateHistory: () => {},
        updateBoard: () => {}
    }
    addlog = mount(<AddLog {...props}/>)

    addlog.setState({
        title: "work",
        startTime: Date.parse("2021/05/01 02:00:00"),
        endTime: Date.parse("2021/05/01 05:00:00"),
        activityTypeName: "Default",
    })

    addlog.instance().submit()

    await sleep (1000);
})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}
