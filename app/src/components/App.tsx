import React, { JSX } from 'react'
import { Route, Routes } from 'react-router'
import { v4 as uuid } from 'uuid'

import { Tree } from 'components/nodes'
import { Navbar } from './Navbar'
// import { normalizedNodes } from '@mono/api'

const ids = [uuid(), uuid()]
const rootIds = [ids[0]]
const data = {
  [ids[0]]: {
    id: ids[0],
    name: 'src',
    kind: 'directory',
    children: [ids[1]],
  },
  [ids[1]]: {
    id: ids[1],
    name: 'index.js',
    kind: 'file',
    size: '1KB',
    modified: '2022-03-08 11:30:00',
  },
}

export default function App(): JSX.Element {
  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/*" element={<Tree rootIds={rootIds} nodes={data} />} />
      </Routes>
    </div>
  )
}
