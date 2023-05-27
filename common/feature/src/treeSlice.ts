import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import { normalizedNodes, rootIds } from '@filetree/api'
import type { RootState } from '@filetree/core'
import type { ITreeNode, ITreeState, UUID } from '.'
import { getCurrentDateTimeString, isDescendant } from '.'

const initialState: ITreeState = {
  nodes: normalizedNodes,
  rootIds,
  activeId: null,
  editId: null,
  expandAll: false,
  isNodeExpanded: Object.values(normalizedNodes).reduce(
    (acc: Record<UUID, boolean>, curr) => {
      if (curr.kind === 'file') return acc
      acc[curr.id] = false
      return acc
    },
    {}
  ),
}

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    toggleExpanded: (
      state,
      { payload: { id, isOpen } }: PayloadAction<{ id: UUID; isOpen?: boolean }>
    ) => {
      state.isNodeExpanded[id] = isOpen ?? !state.isNodeExpanded[id]
    },

    toggleExpandAll: (state) => {
      state.expandAll = !state.expandAll
      for (const id of Object.keys(state.isNodeExpanded))
        state.isNodeExpanded[id as UUID] = state.expandAll
      if (!state.expandAll) state.activeId = null
    },

    setActiveNode: (state, action: PayloadAction<UUID | null>) => {
      state.activeId = action.payload
      if (state.activeId !== state.editId) state.editId = null
    },

    setEditNode: (state, action: PayloadAction<UUID | null>) => {
      state.editId = action.payload
    },

    editNode: (state, action: PayloadAction<{ id: UUID; name: string }>) => {
      state.editId = null
      const targetNode = state.nodes[action.payload.id]
      if (targetNode === undefined) return
      targetNode.name = action.payload.name
      if (targetNode.kind === 'file')
        targetNode.modified = getCurrentDateTimeString()
    },

    deleteNode: (state, action: PayloadAction<UUID>) => {
      delete state.nodes[action.payload]
      delete state.isNodeExpanded[action.payload]
    },

    addNode: (
      state,
      {
        payload: { name, kind },
      }: PayloadAction<{ name: string | ''; kind: 'directory' | 'file' }>
    ) => {
      const baseNode = {
        id: uuid() as UUID,
        name,
        parent: null,
      }
      const newNode: ITreeNode =
        kind === 'directory'
          ? {
              ...baseNode,
              kind,
              children: [],
            }
          : {
              ...baseNode,
              kind,
              size: '0KB',
              modified: getCurrentDateTimeString(),
            }

      const activeNode = state.activeId ? state.nodes[state.activeId] : null
      newNode.parent =
        activeNode?.kind === 'directory'
          ? state.activeId
          : activeNode?.kind === 'file'
          ? activeNode.parent
          : null

      if (newNode.parent === null) state.rootIds.push(newNode.id)
      else {
        const parentNode = state.nodes[newNode.parent]
        if (parentNode?.kind === 'directory') {
          parentNode.children.push(newNode.id)
          state.isNodeExpanded[parentNode.id] = true
        }
      }
      state.nodes[newNode.id] = newNode
      state.editId = state.activeId = newNode.id
    },

    moveNode: (state, action: PayloadAction<UUID | null>) => {
      const targetId = state.activeId
      if (targetId === null) return
      const targetNode = state.nodes[targetId]
      if (targetNode === undefined) return
      const [oldParentId, newParentId] = [targetNode.parent, action.payload]
      if (
        newParentId === targetId ||
        newParentId === oldParentId ||
        (newParentId !== null &&
          (state.nodes[newParentId] === undefined ||
            isDescendant(state.nodes, targetId, newParentId)))
      )
        return

      if (oldParentId === null) {
        state.rootIds = state.rootIds.filter((id) => id !== targetId)
      } else {
        const parentNode = state.nodes[oldParentId]
        if (parentNode?.kind !== 'directory') return
        parentNode.children = parentNode.children.filter(
          (id) => id !== targetId
        )
      }

      targetNode.parent = newParentId
      if (newParentId === null) {
        state.rootIds.push(targetId)
      } else {
        const newParentNode = state.nodes[newParentId]
        if (newParentNode?.kind !== 'directory') return
        newParentNode.children.push(targetId)
      }
    },
  },
})

export const {
  toggleExpanded,
  toggleExpandAll,
  setActiveNode,
  addNode,
  editNode,
  setEditNode,
  deleteNode,
  moveNode,
} = treeSlice.actions

export const selectNode = (state: RootState, nodeId: UUID) =>
  state.tree.nodes[nodeId]
export const selectExpanded = (state: RootState, nodeId: UUID) =>
  state.tree.isNodeExpanded[nodeId]

export const { reducer: treeReducer } = treeSlice
