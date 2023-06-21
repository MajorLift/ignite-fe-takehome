export type UUID = ReturnType<typeof globalThis.crypto.randomUUID>

export type DateTimeString =
  `${string}-${string}-${string} ${string}:${string}:${string}`

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
  name: string
  parent: UUID | null
}

export type IRawTreeNode = IRawDirectoryNode | IRawFileNode

export type IRawDirectoryNode = Omit<IDirectoryNode, 'id' | 'children'> & {
  children: IRawTreeNode[]
}

export type IRawFileNode = Omit<IFileNode, 'id'>
