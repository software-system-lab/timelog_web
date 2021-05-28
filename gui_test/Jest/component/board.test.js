import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {shallow, configure, mount} from 'enzyme';
import { MemoryRouter, Route } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from '../../../src/views/Sidebar'
import Board from '../../../src/views/Board'

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
    })
)

beforeAll(() => {
    process.env.REACT_APP_HOST = API_HOST
    return server.listen()
})

afterEach(() => {
    server.resetHandlers()
})
afterAll(() => server.close())

configure({adapter: new Adapter()});

test('board export button click', async () => {
    jest.mock('file-saver', () => ({
        saveAs: () => {
            
        },
    }))

    const documentIntial = { content: 'aaa' };
    global.URL.createObjectURL = jest.fn();

    const other = 5;
    const labDuty = 5;
    const props = {
        boardData: {
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
            totalTime: "00:00"
        },
        updateBoard: (boardData) => {
            props.boardData = boardData
        },
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
        }
    }
    const board = mount(<Board {...props}/>)


  const pieData = [
      ['Task', 'Hours per Project'],
      ['LabDuty', 5],
      ['Other', 5]
  ]
  const tableData = [
      {
          activityTypeName: 'LabDuty',
          timeLength: "05:00",
          percentage: "50 %"
      },
      {
          activityTypeName: 'Other',
          timeLength: "05:00",
          percentage: "50 %"
      }
  ]

  board.find("#export-button").first().simulate('click')
  
  await sleep(1000)

})

test('board filter button click', async () => {
    const other = 5;
    const labDuty = 5;
    const props = {
        boardData: {
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
            totalTime: "00:00"
        },
        updateBoard: (boardData) => {
            props.boardData = boardData
        },
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
        }
    }
    const board = mount(<Board {...props}/>)

    board.find("#filter-button").first().simulate('click')

    await waitFor (() =>
        board.find("#Select-all-checkbox")
    )

    fireEvent.click(screen.getByTestId('Select-all-checkbox'));

    fireEvent.click(screen.getByTestId('submit-btn'));
    
    await sleep(1000)

})

test('board normal', async () => {
    const other = 5;
    const labDuty = 5;
    const props = {
        boardData: {
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
            totalTime: "00:00"
        },
        updateBoard: (boardData) => {
            props.boardData = boardData
        },
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
        }
    }
    const board = mount(<Board {...props}/>)

    const pieData = [
        ['Task', 'Hours per Project'],
        ['LabDuty', 5],
        ['Other', 5]
    ]
    const tableData = [
        {
            activityTypeName: 'LabDuty',
            timeLength: "05:00",
            percentage: "50 %"
        },
        {
            activityTypeName: 'Other',
            timeLength: "05:00",
            percentage: "50 %"
        }
    ]

    board.find("#board")
    
    await sleep(1000)
})

test('board get board data server side error', async () => {
    server.use(
        rest.post(API_HOST + '/dash-board/spent-time', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' })
            )
        })
    )
    const other = 5;
    const labDuty = 5;
    const props = {
        boardData: {
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
            totalTime: "00:00"
        },
        updateBoard: (boardData) => {
            props.boardData = boardData
        },
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
        }
    }
    const board = mount(<Board {...props}/>)

    const pieData = [
        ['Task', 'Hours per Project'],
        ['LabDuty', 5],
        ['Other', 5]
    ]
    const tableData = [
        {
            activityTypeName: 'LabDuty',
            timeLength: "05:00",
            percentage: "50 %"
        },
        {
            activityTypeName: 'Other',
            timeLength: "05:00",
            percentage: "50 %"
        }
    ]

    board.find("#board")
    
    await sleep(1000)

})

test('board get activity type list server side error', async () => {
    server.use(
        rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' })
            )
        })
    )
    const other = 5;
    const labDuty = 5;
    const props = {
        boardData: {
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
            totalTime: "00:00"
        },
        updateBoard: (boardData) => {
            props.boardData = boardData
        },
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
        }
    }
    const board = mount(<Board {...props}/>)

    const pieData = [
        ['Task', 'Hours per Project'],
        ['LabDuty', 5],
        ['Other', 5]
    ]
    const tableData = [
        {
            activityTypeName: 'LabDuty',
            timeLength: "05:00",
            percentage: "50 %"
        },
        {
            activityTypeName: 'Other',
            timeLength: "05:00",
            percentage: "50 %"
        }
    ]

    board.find("#board")
    
    await sleep(1000)

})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}