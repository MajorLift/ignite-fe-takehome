import { faPen, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { useAppDispatch } from '@filetree/core'
import type { UUID } from '@filetree/feature'
import { deleteNode, setEditNode } from '@filetree/feature'

export function NodeControls({ nodeId }: { nodeId: UUID }) {
  const dispatch = useAppDispatch()

  return (
    <div>
      <button type="button" onClick={() => dispatch(setEditNode(nodeId))}>
        <FontAwesomeIcon className="icon" icon={faPen} />
      </button>
      <button type="button" onClick={() => dispatch(deleteNode(nodeId))}>
        <FontAwesomeIcon className="icon" icon={faX} />
      </button>
    </div>
  )
}
