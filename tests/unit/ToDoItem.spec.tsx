import React from 'react'
import { render } from '@testing-library/react'
import { expect, vi } from 'vitest'

import { ToDoItem } from '../../src/components/ToDoItem'

import userEvent from '@testing-library/user-event'

describe('ToDoItem Component', async () => {
  it('Should be render to Do Item Component with state = false', () => {
    const fakeFnc = vi.fn(() => 0)
    const { getByText, queryByText } = render(
      <ToDoItem
        state={false}
        title="test-title"
        comment="test-comment"
        onCheck={fakeFnc}
        onEdit={fakeFnc}
        onRemove={fakeFnc}
      />
    )

    expect(getByText('test-title')).toBeInTheDocument()
    expect(getByText('test-comment')).toBeInTheDocument()
    expect(queryByText('title-test')).not.toBeInTheDocument()
    expect(queryByText('comment-test')).not.toBeInTheDocument()
  })

  it('Should be render to Do Item Component and test buttons', async () => {
    const editFnc = vi.fn(() => 0)
    const deleteFnc = vi.fn(() => 0)
    const checkFnc = vi.fn(() => 0)

    const { getByTestId } = render(
      <ToDoItem
        state={true}
        title="teste-title"
        comment="teste-comment"
        onCheck={checkFnc}
        onEdit={editFnc}
        onRemove={deleteFnc}
      />
    )

    expect(getByTestId('btn-edit')).toBeInTheDocument()
    expect(getByTestId('btn-delete')).toBeInTheDocument()

    const btnCheck = getByTestId('btn-check')
    const btnEdit = getByTestId('btn-edit')
    const btnDelete = getByTestId('btn-delete')

    await userEvent.click(btnCheck)
    await userEvent.click(btnEdit)
    await userEvent.click(btnDelete)

    expect(editFnc).toHaveBeenCalled()
    expect(deleteFnc).toHaveBeenCalled()
    expect(checkFnc).toHaveBeenCalled()
  })
})
