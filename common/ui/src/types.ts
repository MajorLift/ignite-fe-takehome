import type { UUID } from '@mono/feature'

export type UIState = {
  openState: boolean[]
  openAll: boolean
  activeItemId: UUID | null | undefined
  showEditorModal: boolean
}
