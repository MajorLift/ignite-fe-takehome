import {
  faFile,
  faFolder,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { useAppDispatch, useAppSelector } from '@filetree/core'
import type { UUID } from '@filetree/feature'
import {
  moveNode,
  selectExpanded,
  selectNode,
  setActiveNode,
  toggleExpanded,
} from '@filetree/feature'
import { NodeControls, NodeEditor } from '.'

export function NodeCollapsible({ nodeId }: { nodeId: UUID }) {
  const dispatch = useAppDispatch()
  const { activeId, editId } = useAppSelector((state) => state.tree)
  const node = useAppSelector((state) => selectNode(state, nodeId))

  const isOpen = useAppSelector((state) => selectExpanded(state, nodeId))
  const isDirectory = node?.kind === 'directory'
  const isFile = node?.kind === 'file'
  const isSelected = activeId === nodeId
  const isEditing = editId === nodeId

  return node ? (
    <div>
      <div
        className={`node ${isSelected ? 'selected' : ''}`}
        onDragOver={() => {
          if (isDirectory)
            dispatch(toggleExpanded({ id: nodeId, isOpen: true }))
          dispatch(moveNode(isDirectory ? nodeId : isFile ? node.parent : null))
        }}
      >
        <div
          draggable
          onMouseDown={() => {
            dispatch(setActiveNode(nodeId))
            if (isDirectory && !isEditing)
              dispatch(toggleExpanded({ id: nodeId }))
          }}
        >
          {isDirectory ? (
            isOpen ? (
              <FontAwesomeIcon className="icon" icon={faFolderOpen} />
            ) : (
              <FontAwesomeIcon className="icon" icon={faFolder} />
            )
          ) : isFile ? (
            <FontAwesomeIcon className="icon" icon={faFile} />
          ) : null}

          <span>{` `}</span>
          {!isEditing ? node.name : <NodeEditor nodeId={nodeId} />}
        </div>

        {isSelected && !isEditing && <NodeControls nodeId={nodeId} />}
      </div>

      {isOpen && isDirectory && (
        <ul>
          {node.children.map((childId) => (
            <li key={childId} className="row">
              <NodeCollapsible nodeId={childId} />
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : null
}
