export type TreeState = {
  activeNodeId: UUID | null | undefined
  nodeIds: UUID[]
  nodes: Map<UUID, TreeNode>
}

export type UUID = ReturnType<typeof randomUUID>

export type DateTimeString =
  `${string}-${string}-${string} ${string}:${string}:${string}`

export interface DirectoryNode {
  readonly id: UUID
  name: string
  readonly kind: 'directory'
  children: UUID[]
  parent: UUID | null
}

export interface FileNode {
  readonly id: UUID
  name: `${string}.${string}`
  readonly kind: 'file'
  size: `${number}${'' | 'K' | 'M' | 'G' | 'T' | 'P'}B`
  modified: DateTimeString
  parent: UUID | null
}

export type TreeNode = DirectoryNode | FileNode

export type RawDirectoryNode = Omit<DirectoryNode, 'id' | 'children'> & {
  children: RawTreeNode[]
}
export type RawFileNode = Omit<FileNode, 'id'>
export type RawTreeNode = RawDirectoryNode | RawFileNode

export type RootNode = TreeNode | TreeNode[]
