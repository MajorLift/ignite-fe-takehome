import React, { JSX } from 'react'

import { useDeleteItemMutation, useFindAllItemsQuery } from '@mono/api'
import { useAppDispatch } from '@mono/core'
import { setActiveItemId, toggleEditorModal } from '@mono/ui'

import type { FileNode, UUID } from '@mono/feature'

export function FileNode({ id }: { id: UUID }): JSX.Element | null {
  const dispatch = useAppDispatch()

  const { currentItem } = useFindAllItemsQuery<{
    currentItem: FileNode | undefined
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

  return currentItem ? (
    <>
      <div className="flex flex-row justify-between p-4 shadow rounded-t-xl">
        <div>
          <div className="m-1 text-xl font-bold font-sans-serif text-sky-600">
            {currentItem.name}
          </div>
          <div className="m-1 text-xl font-bold font-sans-serif text-sky-600">
            {currentItem.size}
          </div>
          <div className="m-1 text-xs font-light text-gray-500">
            {new Date(currentItem.modified).toLocaleString()}
          </div>
        </div>
        <div className="flex flex-row items-end space-x-1 text-sm">
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 duration-200 rounded shadow-sm active:bg-sky-300 bg-sky-500 hover:bg-sky-400 hover:shadow-lg"
            onClick={() => {
              dispatch(setActiveItemId(currentItem.id))
              dispatch(toggleEditorModal())
            }}
          >
            Edit
          </button>
          <button
            className="p-1 pl-4 pr-4 font-semibold text-gray-100 duration-200 rounded shadow-sm active:bg-rose-300 bg-slate-400 hover:bg-rose-400 hover:shadow-rose-300"
            onClick={handleClickDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  ) : null
}
