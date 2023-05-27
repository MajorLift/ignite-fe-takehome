import React from 'react'

import { useAppDispatch, useAppSelector } from '@filetree/core'
import { moveNode } from '@filetree/feature'
import { NodeCollapsible } from '../node'

export function TreeLayout() {
  const dispatch = useAppDispatch()
  const { rootIds } = useAppSelector((state) => state.tree)

  return rootIds.length ? (
    <div className="container">
      <hr
        onDragOver={() => {
          dispatch(moveNode(null))
        }}
      />
      <ul>
        {rootIds.map((id) => (
          <li key={id}>
            <NodeCollapsible nodeId={id} />
          </li>
        ))}
      </ul>
      <hr
        onDragOver={() => {
          dispatch(moveNode(null))
        }}
      />
    </div>
  ) : null
}
