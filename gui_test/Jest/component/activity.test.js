import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Activity from '../../../src/views/Activity'

const API_HOST = "http://localhost"

const server = setupServer(
    rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
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
)

beforeAll(() => {
    process.env.REACT_APP_HOST = API_HOST
    return server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

configure({adapter: new Adapter()});

test('activity normal', async () => {
  let closeCount = 0
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
    updateActivity: (activityData) => {
      props.activityData = activityData
    }
  }
  const activity = mount(
        <Activity {...props}/>
  )

  activity.find('#activity-table')
  await sleep(1000)
})

test('add activity', async () => {
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
    updateActivity: (activityData) => {
      props.activityData = activityData
    }
  }
  const activity = mount(
      <Activity {...props}/>
  )


  await sleep(1000)
  server.use(
    rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
      return res.once(ctx.json({
          activityTypeList: ['LabDuty', 'LabProject', 'Other', 'Study']
      }))
    })
  )

  const new_data = {
    name: 'Study',
    enable: true,
    private: false
  }

  activity.find('#activity-table').at(2).instance().props.editable.onRowAdd(new_data)

  await sleep(2000);
})

test('edit activty', async () => {
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
    updateActivity: (activityData) => {
      props.activityData = activityData
    }
  }
  const activity = mount(
    <Activity {...props}/>
  )

  await sleep(1000)
  server.use(
    rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
      return res(ctx.json({
          activityTypeList: ['LabDuty', 'LabProject', 'Study']
      }))
    })
  )
  const old_data = {
    name: 'Other',
    enable: true,
    private: false
  }

  const new_data = {
    name: 'Study',
    enable: true,
    private: false
  }

  activity.find('#activity-table').at(2).instance().props.editable.onRowUpdate(new_data, old_data)

  await sleep(2000);
})

test('edit activty when is not editable', async () => {
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
    updateActivity: (activityData) => {
      props.activityData = activityData
    }
  }
  const activity = mount(
    <Activity {...props}/>
  )

  await sleep(1000)
  server.use(
    rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
      return res(ctx.json({
          activityTypeList: ['LabDuty', 'LabProject', 'Study']
      }))
    })
  )
  const data = {
    name: 'LabDuty',
    enable: true,
    private: false
  }

  expect(activity.find('#activity-table').at(2).instance().props.editable.isEditable(data)).toBe(false)
})

test('edit activty when is not deletable', async () => {
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
    updateActivity: (activityData) => {
      props.activityData = activityData
    }
  }
  const activity = mount(
    <Activity {...props}/>
  )

  await sleep(1000)
  server.use(
    rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
      return res(ctx.json({
          activityTypeList: ['LabDuty', 'LabProject', 'Study']
      }))
    })
  )
  const data = {
    name: 'LabDuty',
    enable: true,
    private: false
  }

  expect(activity.find('#activity-table').at(2).instance().props.editable.isDeletable(data)).toBe(false)
})

test('delete activty', async () => {
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
    updateActivity: (activityData) => {
      props.activityData = activityData
    }
  }
  const activity = mount(
    <Activity {...props}/>
  )

  await sleep(1000)
  server.use(
    rest.post(API_HOST + '/activity/all', (req, res, ctx) => {
      return res(ctx.json({
          activityTypeList: ['LabDuty', 'LabProject']
      }))
    })
  )
  const old_data = {
    name: 'Other',
    enable: true,
    private: false
  }

  activity.find('#activity-table').at(2).instance().props.editable.onRowDelete(old_data)

  await sleep(2000);
})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}