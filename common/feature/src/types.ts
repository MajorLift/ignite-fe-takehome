export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type DateTimeString =
  `${string}-${string}-${string} ${string}:${string}:${string}`

export interface ITreeState {
  nodes: Record<UUID, ITreeNode>
  rootIds: UUID[]
  activeId: UUID | null
  editId: UUID | null
  expandAll: boolean
  isNodeExpanded: Record<UUID, boolean>
}

export type ITreeNode = IDirectoryNode | IFileNode

export interface IDirectoryNode {
  readonly id: UUID
  name: string
  readonly kind: 'directory'
  children: UUID[]
  parent: UUID | null
}

export interface IFileNode {
  readonly id: UUID
  name: `${string}.${string}` | string
  readonly kind: 'file'
  size: `${number}${'' | 'K' | 'M' | 'G' | 'T' | 'P'}B`
  modified: DateTimeString
  parent: UUID | null
}

export type IRawTreeNode = IRawDirectoryNode | IRawFileNode

export type IRawDirectoryNode = Omit<IDirectoryNode, 'id' | 'children'> & {
  children: IRawTreeNode[]
}

export type IRawFileNode = Omit<IFileNode, 'id'>
