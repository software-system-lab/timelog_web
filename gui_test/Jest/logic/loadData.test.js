import { load_dash_board, load_history, load_activity_type_list } from "../../../src/request/loadData"
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitFor } from "@testing-library/dom";

const API_HOST = "http://localhost"

const server = setupServer(
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
    })
)

beforeAll(() => {
    process.env.REACT_APP_HOST = API_HOST
    return server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('load dash board data', done => {
    const userID = 'u12345'
    const filterList = [];
    const callback = response => {
        expect(response.data.totalTime).toBe(10)
        expect(response.data.dataMap.Other.timeLength).toBe(5)
        expect(response.data.dataMap.LabDuty.timeLength).toBe(5)
        done()
    }
    const errCallback = err => {
        console.log(err)
        fail('Should not occur error')
    }
    load_dash_board(userID, filterList, callback, errCallback)
})

test('load dash board data error', done => {
    server.use(
        rest.post(API_HOST + '/dash-board/spent-time', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' }),
              )
        
        }))
    const userID = 'u12345'
    const filterList = [];
    const callback = response => {
        fail('Should get internal server error')
    }
    const errCallback = err => {
        expect(err.response.request.status).toBe(500)
        done()
    }
    load_dash_board(userID, filterList, callback, errCallback)
})

test('load history', done => {
    const userID = 'u12345'
    const callback = response => {
        expect(response.data.logItemList.length).toBe(1)
        expect(response.data.logItemList[0].title = "asian plop")
        done()
    }
    const errCallback = err => {
        console.log(err)
        fail('Should not occur error')
    }
    load_history(userID, callback, errCallback)
})

test('load history error', done => {
    server.use(
        rest.post(API_HOST + '/log/history', (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' }),
              )
        
        }))
    const userID = 'u12345'
    const callback = response => {
        fail('Should get internal server error')
    }
    const errCallback = err => {
        expect(err.response.request.status).toBe(500)
        done()
    }
    load_history(userID, callback, errCallback)
})
