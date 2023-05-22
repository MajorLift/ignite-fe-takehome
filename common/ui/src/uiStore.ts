import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { UUID } from '@mono/feature'
import type { UIState } from './'
import { treeSlice } from '@mono/feature';

const initialState = {
  openState: new Array(treeSlice.nodes.length).fill(false),
  openAll: false,
  activeItemId: undefined, // unsaved draft has null id
  showEditorModal: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveItemId: (
      state: UIState,
      action: PayloadAction<UUID | null | undefined>
    ) => {
      state.activeItemId = action.payload
    },
    toggleEditorModal: (state: UIState) => {
      state.showEditorModal = !state.showEditorModal
    },
    toggleOpenAll: (state: UIState) => {
      state.openAll = !state.openAll
    },
  },
})

export const { setActiveItemId, toggleEditorModal, toggleOpenAll } =
  uiSlice.actions
export const uiReducer = uiSlice.reducer
