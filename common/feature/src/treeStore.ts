import { v4 as uuid } from 'uuid'

import { normalizedNodes } from '@mono/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TreeNode, TreeState, UUID } from '.'

const initialState = {
  activeNodeId: undefined,
  nodeIds: Array.from(normalizedNodes.keys()),
  nodes: normalizedNodes,
}

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setActiveNode: (
      state: TreeState,
      action: PayloadAction<UUID | null | undefined>
    ) => {
      state.activeNodeId = action.payload
    },
    addNode: (
      state: TreeState,
      action: PayloadAction<{ kind: 'directory' | 'file'; name: string }>
    ) => {
      const newId = uuid()
      const newNode =
        action.payload.kind === 'directory'
          ? {
              id: newId,
              kind: 'directory' as const,
              name: action.payload.name,
              children: [],
            }
          : {
              id: newId,
              kind: 'file' as const,
              name: action.payload.name,
              size: '0B',
              modified: new Date().toLocaleString(),
            }
      state.nodes.set(newId, newNode as TreeNode)
      state.nodeIds.push(newId)
      if (state.activeNodeId) {
        const curr = state.nodes
          .get(state.activeNodeId)

          .children.push(newId)
      }
    },
    deleteNode: (state: TreeState) => {
      if (state.activeNodeId == null) return
      const targetNode = state.nodes.get(state.activeNodeId)
      const parentNode = targetNode.parent
        ? state.nodes.get(targetNode.parent)
        : null
      if (parentNode) {
        parentNode.children = parentNode.children.filter(
          (id) => id !== state.activeNodeId
        )
      }
      state.nodes.delete(state.activeNodeId)
      state.nodeIds = state.nodeIds.filter((id) => id !== state.activeNodeId)
    },
    editNodeName: (state: TreeState, action: PayloadAction<string>) => {
      if (state.activeNodeId == null) return
      const targetNode = state.nodes.get(state.activeNodeId)
      if (targetNode === undefined) return
      targetNode.name = action.payload
    },
  },
})

export const { setActiveItemId, toggleEditorModal, toggleOpenAll } =
  treeSlice.actions
export const treeReducer = treeSlice.reducer
