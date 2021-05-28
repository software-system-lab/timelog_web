import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {shallow, configure, mount} from 'enzyme';
import { MemoryRouter, Route } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from '../../../src/views/Sidebar'
import History from '../../../src/views/History'

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
    }),
    rest.post(API_HOST + '/log/remove', (req, res, ctx) => {
        const other = 5;
        const labDuty = 5;
        return res(ctx.json({
            logItemList: [
                {
                    activityTypeName: "LabDuty",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        }))
    }),
    rest.post(API_HOST + '/log/edit', (req, res, ctx) => {
        const other = 5;
        const labDuty = 5;
        return res(ctx.json({
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        }))
    }),
)

beforeAll(() => {
    process.env.REACT_APP_HOST = API_HOST
    return server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

configure({adapter: new Adapter()});

test('activity type list server side error', async () => {
  server.use(
        rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' })
            )
        })
    )
  let closeCount = 0
  const props = {
    historyData: {
        logItemList: [
            {
                activityTypeName: "Other",
                endTime: "2021/05/10 01:04",
                id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                startTime: "2021/05/10 00:04",
                title: "asian plop"
            }
        ]
    },
    handleClose: () => {closeCount += 1},
    updateDates: () => {},
    updateHistory: (historyData) => {
        props.historyData = historyData
    },
    updateDashBoard: () => {}
  }
  const history = mount(
      <History {...props}
      />
  )

  history.find('#history_table')
  await sleep(1000)
})

test('history normal', async () => {
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    history.find('#history_table')
    await sleep(1000)
})

test('history server side error', async () => {
  server.use(
        rest.post(API_HOST + '/log/history', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' })
            )
        })
    )
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    history.find('#history_table')
    await sleep(1000)
})

test("Delete log", async () => {
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    await sleep(1000)

    server.use(
        rest.post(API_HOST +'/log/history', (req, res, ctx) => {
            return res.once(ctx.json({
                logItemList: []
            }))
        })
    )
    
    history.find('#history_table').at(2).instance().props.editable.onRowDelete(props.historyData.logItemList[0])

    await sleep(1000)

    expect(props.historyData.logItemList.length).toBe(0)
})

test("Delete log server side failed", async () => {
    server.use(
        rest.post(API_HOST + '/log/remove', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' })
            )
        })
    )
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    await sleep(1000)
    
    history.find('#history_table').at(2).instance().props.editable.onRowDelete(props.historyData.logItemList[0])

    await sleep(1000)

})

test("Edit log", async () => {
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "LabDuty",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    await sleep(1000)

    const oldData = {
                        activityTypeName: "LabDuty",
                        endTime: "2021/05/10 01:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 00:04",
                        title: "asian plop"
                    }
    const newData = {
                        activityTypeName: "Other",
                        endTime: "2021/05/10 01:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 00:04",
                        title: "asian plop"
                    }

    server.use(
        rest.post(API_HOST +'/log/history', (req, res, ctx) => {
            return res.once(ctx.json({
                logItemList: [
                    newData
                ]
            }))
        })
    )
    
    history.find('#history_table').at(2).instance().props.editable.onRowUpdate(newData, oldData)

    await sleep(2000)

    expect(props.historyData.logItemList[0].activityTypeName).toBe('Other')
})

test("Edit log when title is empty", async done => {
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    await sleep(1000)

    const oldData = {
                        activityTypeName: "LabDuty",
                        endTime: "2021/05/10 01:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 00:04",
                        title: "asian plop"
                    }
    const newData = {
                        activityTypeName: "LabDuty",
                        endTime: "2021/05/10 01:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 00:04",
                        title: ""
                    }
    
    history.find('#history_table').at(2).instance().props.editable.onRowUpdate(newData, oldData).then(() => {}).catch((err) => {
        expect(err).toBe("Title should not be empty.")
        done()
    })
})

test("Edit log when end time is earlier than start time", async done => {
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    await sleep(1000)

    const oldData = {
                        activityTypeName: "LabDuty",
                        endTime: "2021/05/10 01:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 00:04",
                        title: "asian plop"
                    }
    const newData = {
                        activityTypeName: "LabDuty",
                        endTime: "2021/05/10 00:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 01:04",
                        title: "asian plop"
                    }
    
    history.find('#history_table').at(2).instance().props.editable.onRowUpdate(newData, oldData).then(() => {}).catch((err) => {
        expect(err).toBe("Start Time should be eariler than End Time.")
        done()
    })
})

test("Edit log server side error", async () => {
    server.use(
        rest.post(API_HOST + '/log/edit', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' })
            )
        })
    )
    let closeCount = 0
    const props = {
        historyData: {
            logItemList: [
                {
                    activityTypeName: "Other",
                    endTime: "2021/05/10 01:04",
                    id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                    startTime: "2021/05/10 00:04",
                    title: "asian plop"
                }
            ]
        },
        handleClose: () => {closeCount += 1},
        updateDates: () => {},
        updateHistory: (historyData) => {
            props.historyData = historyData
        },
        updateDashBoard: () => {}
    }
    const history = mount(
        <History {...props}
        />
    )

    await sleep(1000)

    const oldData = {
                        activityTypeName: "LabDuty",
                        endTime: "2021/05/10 01:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 00:04",
                        title: "asian plop"
                    }
    const newData = {
                        activityTypeName: "Other",
                        endTime: "2021/05/10 01:04",
                        id: "0a8eb938-3e74-48e7-8a18-3098f04996ff",
                        startTime: "2021/05/10 00:04",
                        title: "asian plop"
                    }
    
    history.find('#history_table').at(2).instance().props.editable.onRowUpdate(newData, oldData)

    await sleep(2000)

})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}