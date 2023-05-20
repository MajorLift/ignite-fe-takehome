import React, { JSX } from 'react'
import { Route, Routes } from 'react-router'

import { ItemsLayout } from 'components/items'
import { Navbar } from './Navbar'

export default function App(): JSX.Element {
  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/*" element={<ItemsLayout />} />
      </Routes>
    </div>
  )
}
