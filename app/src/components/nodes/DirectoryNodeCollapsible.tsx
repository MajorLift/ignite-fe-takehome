import React, { JSX, useEffect, useState } from 'react'

import { useDeleteItemMutation, useFindAllItemsQuery } from '@mono/api'
import { useAppDispatch, useAppSelector } from '@mono/core'

import type { DirectoryNode, UUID } from '@mono/feature'
import { FileNode } from './FileNode'

export function DirectoryNodeCollapsible({
  id,
}: {
  id: UUID
}): JSX.Element | null {
  const dispatch = useAppDispatch()

  const { openAll } = useAppSelector((state) => state.ui)
  const [open, setOpen] = useState(openAll)

  useEffect(() => {
    setOpen(openAll)
  }, [openAll])

  const { currentItem } = useFindAllItemsQuery<{
    currentItem: DirectoryNode | undefined
  }>(undefined, {
    selectFromResult: ({ data }) => ({
      currentItem: data?.find((node) => node.id === id),
    }),
  })

  const [deleteItem] = useDeleteItemMutation()

  const handleClickDelete = async () => {
    try {
      if (currentItem === undefined) throw new TypeError('Item is undefined')
      await deleteItem(currentItem.id)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
    
      {/* {open && (
        <div>
          {currentItem.children.map((node) =>
            node.kind === 'directory' ? (
              <DirectoryNodeCollapsible id={node.id} />
            ) : (
              <FileNode id={node.id} />
            )
          )}
        </div>
      )} */}
    </>
  )
}
