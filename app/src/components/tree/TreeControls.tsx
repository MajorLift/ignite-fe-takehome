import {
  faCaretDown,
  faCaretRight,
  faFile,
  faFolder,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { useAppDispatch, useAppSelector } from '@filetree/core'
import { addNode, toggleExpandAll } from '@filetree/feature'

export function TreeControls() {
  const dispatch = useAppDispatch()
  const { expandAll } = useAppSelector((state) => state.tree)

  return (
    <div className="controls">
      <button type="button" onClick={() => dispatch(toggleExpandAll())}>
        {expandAll ? (
          <FontAwesomeIcon icon={faCaretDown} />
        ) : (
          <FontAwesomeIcon icon={faCaretRight} />
        )}
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(addNode({ name: '', kind: 'file' }))
        }}
      >
        <FontAwesomeIcon icon={faFile} />
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(addNode({ name: '', kind: 'directory' }))
        }}
      >
        <FontAwesomeIcon icon={faFolder} />
      </button>
    </div>
  )
}
