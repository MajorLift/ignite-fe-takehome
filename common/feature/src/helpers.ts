import type { DateTimeString, ITreeNode, UUID } from './types'

export function getCurrentDateTimeString() {
  return new Date()
    .toISOString()
    .slice(0, -5)
    .split('T')
    .join(' ') as DateTimeString
}

export function isDescendant(
  nodes: Record<UUID, ITreeNode>,
  targetId: UUID,
  newParentId: UUID
): boolean {
  if (newParentId === null) return false
  const targetNode = nodes[targetId]
  if (targetNode?.kind !== 'directory') return false
  return (
    targetNode.children.includes(newParentId) ||
    targetNode.children.some((child) => isDescendant(nodes, child, newParentId))
  )
}
