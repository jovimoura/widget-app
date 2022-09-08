import { Plus, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Input } from './components/Input'
import { ToDoListType } from './components/ToDoItem'
import { ToDoList } from './components/ToDoList'
import { Widget } from './components/Widget'

export function App() {
  const [viewInputs, setViewInputs] = useState(false)
  const [titleItem, setTitleItem] = useState('')
  const [commentItem, setCommentItem] = useState('')
  const [stateItem, setStateItem] = useState(false)

  const [isEdit, setIsEdit] = useState(false)

  const [toDoItens, setToDoItens] = useState<ToDoListType[]>([])

  const [localDataItem, setLocalDataItem] = useState<any>()
  const [count, setCount] = useState(0)

  function handleLocalStorageData() {
    const json = localStorage.getItem('localData')
    const arr = JSON.parse(json as string)
    setLocalDataItem(arr)
    Array.isArray(arr) ? setLocalDataItem(arr) : setLocalDataItem([])
  }

  useEffect(() => {
    handleLocalStorageData()
  }, [toDoItens, count])

  function handleClear() {
    setTitleItem('')
    setCommentItem('')
    setStateItem(false)
  }

  function handleAddToDo() {
    if (titleItem.length > 0 && commentItem.length > 0) {
      let newList: any = [...localDataItem] ?? [...toDoItens]
      newList.push({
        id: toDoItens.length + 1,
        title: titleItem,
        comment: commentItem,
        state: stateItem
      })
      localStorage.setItem('localData', JSON.stringify(newList))
      handleLocalStorageData()
      setToDoItens(newList)
      handleClear()
    }
  }

  function handleEditToDo(id: number) {
    setIsEdit(true)
    setViewInputs(true)
    let newList: any = [...localDataItem] ?? [...toDoItens]

    const arr = newList.find((item: any) => item.id === id)

    setCommentItem(arr.comment)
    setTitleItem(arr.title)
    newList = newList.filter((item: any) => item.id !== id)

    localStorage.setItem('localData', JSON.stringify(newList))
    setToDoItens(newList)
    setIsEdit(false)
  }

  return (
    <>
      <div className="flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold italic mb-5">
          To Do <a className="text-brand-300">Widget</a>
        </h1>
        <div className="md:w-2/4 w-3/4 mb-10 ">
          <div className="w-4/5 flex justify-start">
            <button
              onClick={() => setViewInputs(!viewInputs)}
              className="h-12 px-3 flex justify-center items-center bg-brand-300 border border-transparent rounded-full hover:bg-brand-500 transition-colors group"
            >
              {!viewInputs ? (
                <Plus className="text-white h-6 w-6" />
              ) : (
                <X className="text-white h-6 w-6" />
              )}
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                <span className="pl-2"></span>
                {!viewInputs ? 'New' : 'Close'}
              </span>
            </button>
          </div>
          {viewInputs ? (
            <>
              <Input
                onChange={e => setTitleItem(e.target.value)}
                value={titleItem}
                className="bg-transparent focus:outline-none w-full dark:text-gray-50 dark:placeholder:text-gray-50"
                placeholder="Title"
              />
              <Input
                onChange={e => setCommentItem(e.target.value)}
                value={commentItem}
                className="bg-transparent focus:outline-none w-full dark:text-gray-50 dark:placeholder:text-gray-50"
                placeholder="Comment"
              />
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={handleAddToDo}
                  className="w-32 h-9 bg-brand-300 border border-transparent rounded-md hover:bg-brand-500 transition-colors"
                >
                  {!isEdit ? 'Add' : 'Edit'}
                </button>
              </div>
            </>
          ) : null}
        </div>
        <ToDoList
          onUpdate={handleEditToDo}
          onChange={() => setCount(count + 1)}
          list={localDataItem ?? toDoItens}
        />
      </div>
      <Widget />
    </>
  )
}
