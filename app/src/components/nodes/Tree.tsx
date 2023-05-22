import React, { JSX } from 'react'

import { useAppDispatch } from '@mono/core'
import type { TreeNode, UUID } from '@mono/feature'
import { DirectoryNodeCollapsible } from './DirectoryNodeCollapsible'
import { FileNode } from './FileNode'

export const Tree = ({
  rootIds,
  nodes,
}: {
  rootIds: UUID[]
  nodes: Record<UUID, TreeNode>
}): JSX.Element => {
  // const dispatch = useAppDispatch()

  // const { data } = useAppSelector((state) => state.itemsApi)

  return (
    <div className="bg-white shadow-lg shadow-black rounded-xl">
      {rootIds.map((rootId, i) => {
        const node = nodes[rootId]
        return node.kind === 'directory' ? (
          <DirectoryNodeCollapsible key={i * Math.random()} id={node.id} />
        ) : (
          <FileNode key={i * Math.random()} id={node.id} />
        )
      })}
    </div>
  )
}
