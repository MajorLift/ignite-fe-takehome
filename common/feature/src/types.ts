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

export interface IDirectoryNode extends IBaseNode {
  readonly kind: 'directory'
  children: UUID[]
}

export interface IFileNode extends IBaseNode {
  readonly kind: 'file'
  name: `${string}${'.' | ''}${string}`
  size: `${number}${'' | 'K' | 'M' | 'G' | 'T' | 'P'}B`
  modified: DateTimeString
}

export interface IBaseNode {
  readonly id: UUID
  readonly kind?: string
  name: string
  parent: UUID | null
}

export type IRawTreeNode = IRawDirectoryNode | IRawFileNode

export type IRawDirectoryNode = Omit<IDirectoryNode, 'id' | 'children'> & {
  children: IRawTreeNode[]
}

export type IRawFileNode = Omit<IFileNode, 'id'>
