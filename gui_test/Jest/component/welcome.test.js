import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter, Route } from "react-router-dom";
import Welcome from '../../../src/views/Welcome'

test('Welcome click tutorial', async () => {
  render(
    <Welcome/>
  )

  fireEvent.click(screen.getByTestId('tutorial-btn'))

  expect(screen.getByTestId('tutorial')).toBeInTheDocument()

  await sleep(1000)

  fireEvent.click(screen.getByTestId('close-btn'))


  await sleep(1000)

})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}