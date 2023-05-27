import { treeReducer } from '@filetree/feature'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    tree: treeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
