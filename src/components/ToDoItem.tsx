import { Check, Pencil, Trash } from 'phosphor-react'

export type ToDoListType = {
  id?: any
  title: string
  comment: string
  state: boolean
  onRemove: () => void
  onEdit: () => void
  onCheck: () => void
}

export function ToDoItem({
  id,
  comment,
  onCheck,
  onEdit,
  onRemove,
  state,
  title
}: ToDoListType) {
  return (
    <div
      className={`flex w-4/5 items-center border-2 border-transparent rounded-md text-zinc-400 bg-gray-600 mb-6 p-2 hover:border-zinc-400 transition-colors ${
        state ? 'bg-green-900' : ''
      }`}
    >
      <button
        onClick={onCheck}
        className="w-10 h-10 flex justify-center items-center bg-green-500 border border-transparent rounded-md hover:bg-green-700 transition-colors"
        data-testid='btn-check'
      >
        <Check size={24} className="text-white" />
      </button>
      <div className="ml-4 w-11/12">
        <h2 className="font-bold text-zinc-100 text-xl">{title}</h2>
        <p className="break-all w-full text-zinc-300">{comment}</p>
      </div>
      <div className="flex md:flex-row flex-col gap-4 justify-end">
        <button
          onClick={onEdit}
          className="w-10 h-10 flex justify-center items-center bg-green-500 border border-transparent rounded-md hover:bg-green-700 transition-colors"
          data-testid='btn-edit'
        >
          <Pencil size={24} className="text-white" />
        </button>
        <button
          onClick={onRemove}
          className="w-10 h-10 flex justify-center items-center bg-red-700 border border-transparent rounded-md hover:bg-red-800 transition-colors"
          data-testid='btn-delete'
        >
          <Trash size={24} className="text-white" />
        </button>
      </div>
    </div>
  )
}
