import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {shallow, configure, mount} from 'enzyme';
import { MemoryRouter, Route } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import PopoverProfile from '../../../src/views/PopoverProfile'

test('popover profile normal', async () => {
  render(<PopoverProfile />)

  fireEvent.click(screen.getByTestId('logout-btn'))

  await sleep(1000)

})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}