import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter, Route } from "react-router-dom";
import Tutorial from '../../../src/views/Tutorial'

test('Tutorial click next and back', async () => {
  let close = 0
  render(
    <Tutorial 
        open={true} 
        handleClose={()=>{close += 1}}
    />
  )

  await sleep(1000)

  fireEvent.click(screen.getByTestId('next-btn'))

  fireEvent.click(screen.getByTestId('back-btn'))

  fireEvent.click(screen.getByTestId('close-btn'))

  expect(close).toBe(1);


  await sleep(1000)

})

async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}