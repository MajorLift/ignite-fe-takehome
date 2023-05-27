import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@filetree/core'
import type { UUID } from '@filetree/feature'
import {
  deleteNode,
  editNode,
  selectNode,
  setEditNode,
} from '@filetree/feature'

export function NodeEditor({ nodeId }: { nodeId: UUID }) {
  const dispatch = useAppDispatch()

  const node = useAppSelector((state) => selectNode(state, nodeId))
  const [newName, setNewName] = useState('')

  return node ? (
    <>
      <input
        type="text"
        defaultValue={node.name}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          dispatch(editNode({ id: nodeId, name: newName || node.name }))
        }}
      >
        ✔
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(setEditNode(null))
          if (node.name === '') dispatch(deleteNode(nodeId))
        }}
      >
        X
      </button>
    </>
  ) : null
}
