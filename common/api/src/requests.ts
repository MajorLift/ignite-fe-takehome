import type { RawTreeNode, TreeNode, UUID } from '@mono/feature'
import { v4 as uuid } from 'uuid'
import mockData from './mock-data.json'

const data = mockData
export const normalizedNodes: Map<UUID, TreeNode> = new Map()
export const rootIds: UUID[] = []

data.forEach((node) => {
  rootIds.push(processTree(node as RawTreeNode).id)
})

export function processTree(node: RawTreeNode): TreeNode {
  const id = uuid()
  const processedNode =
    node.kind === 'file'
      ? { ...node, id }
      : {
          ...node,
          id,
          children: node.children
            .map((child: RawTreeNode) => {
              const newNode = processTree(child)
              newNode.parent = id
              return newNode
            })
            .map((child: TreeNode) => child.id),
        }
  normalizedNodes.set(processedNode.id, processedNode)
  return processedNode
}
