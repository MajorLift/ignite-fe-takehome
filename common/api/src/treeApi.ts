import type { IRawTreeNode, ITreeNode, UUID } from '@filetree/feature'
import mockData from './mock-data.json'

export const normalizedNodes: Record<UUID, ITreeNode> = {}

export function processTree(node: IRawTreeNode, isRoot = false): ITreeNode {
  const id = globalThis.crypto.randomUUID()
  if (isRoot) node.parent = null
  const processedNode =
    node.kind === 'file'
      ? { ...node, id }
      : {
          ...node,
          id,
          children: node.children
            .map((child: IRawTreeNode) => {
              const newNode = processTree(child)
              newNode.parent = id
              return newNode
            })
            .map((child: ITreeNode) => child.id),
        }
  normalizedNodes[processedNode.id] = processedNode
  return processedNode
}

const data = Array.isArray(mockData) ? [...mockData] : [{ ...mockData }]
export const rootIds: UUID[] = data.map(
  (rootNode: IRawTreeNode) => processTree(rootNode, true).id
)
