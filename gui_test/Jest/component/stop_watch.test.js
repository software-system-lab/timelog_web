import React from 'react'
import { act } from 'react-dom/test-utils';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {shallow, configure, mount} from 'enzyme';
import { MemoryRouter, Route } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import Stopwatch from '../../../src/views/Stopwatch'
import { Done } from '@material-ui/icons'

test('stop watch normal', async done => {
  act(() => {
    const props = {
      open: true,
      handleClose: () => {},
      openAddLogDialog: () => {done()},
      stopWatchTime: "00:00:00",
      updateStopWatchTime: (time) => {
        props.stopWatchTime = time
      },
    }
    render(
      <Stopwatch
        {...props}
      />)
  })

  await act(async () => {
    fireEvent.click(screen.getByTestId('stopwatch-start-button'))
    await sleep(1000)
    fireEvent.click(screen.getByTestId('stopwatch-start-button'))
    await sleep(1000)
    fireEvent.click(screen.getByTestId('stopwatch-stop-button'))

  })
})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}