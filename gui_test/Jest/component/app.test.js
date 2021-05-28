import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {shallow, configure, mount} from 'enzyme';
import { MemoryRouter, Route } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import App from '../../../src/App'
import { DateRangeSharp } from '@material-ui/icons'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../../src/redux/reducer';

const store = createStore(
  rootReducer
)

const API_HOST = "http://localhost"

configure({adapter: new Adapter()});

const server = setupServer(
    rest.post(API_HOST + '/login', (req, res, ctx) => {
        return res(ctx.json({
            status: 'success'
        }))
    }),
)

test('login without user id go back to ams', async () => {
    const app = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Route path="/" component={App}/>
            </MemoryRouter>
        </Provider>
    )

    await sleep(1000)
  })

  test('login success', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => key);

    const app = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Route path="/" component={App}/>
            </MemoryRouter>
        </Provider>
    )

    await sleep(1000)
  })

test('login failed', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => key);

    server.use(
          rest.post(API_HOST + '/login', (req, res, ctx) => {
              return res.once(
                  ctx.status(500),
                  ctx.json({ status: 'login failed' })
              )
          })
      )

      const app = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Route path="/" component={App}/>
            </MemoryRouter>
        </Provider>
    )
    
    await sleep(1000)
  })

  test("update date", async () => {

    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => key);

    const app = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Route path="/" component={App}/>
            </MemoryRouter>
        </Provider>
    )

    app.find('#duration-button').first().simulate('click')


    await sleep(1000)

  })

async function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
  }