import { ToDoItem, ToDoListType } from './ToDoItem'

interface ToDoListProps {
  list: ToDoListType[]
  onChange: () => void
  onUpdate: (id: any) => void
}

export function ToDoList({ list, onChange, onUpdate }: ToDoListProps) {

  function handleDelete(id: any) {
    const json = localStorage.getItem('localData')
    const arr = JSON.parse(json as string)

    const toJson = arr.filter((item:any) => item.id !== id)
    const newArr = JSON.stringify(toJson)
    localStorage.setItem('localData', newArr)
    onChange()
  }

  function handleCheck(id: any) {
    const json = localStorage.getItem('localData')
    const arr = JSON.parse(json as string)

    const list = arr.find((item: any) => item.id === id)

    list.state = !list.state

    const toJson = arr.filter((item:any) => item.id !== id)
    const newArr = JSON.stringify([...toJson, list])
    localStorage.setItem('localData', newArr)
    onChange()
  }

  return (
    <div className="flex flex-col w-full items-center">
      {list.length > 0 ? (
        <>
          {list?.map((item: ToDoListType) => (
            <ToDoItem
              key={item.id}
              id={item.id}
              comment={item.comment}
              title={item.title}
              state={item.state}
              onEdit={() => onUpdate(item.id)}
              onRemove={() => handleDelete(item.id)}
              onCheck={() => handleCheck(item.id)}
            />
          ))}
        </>
      ) : (
        <span className='text-gray-200 text-center'>Crie novas tarefas!</span>
      )}
    </div>
  )
}
