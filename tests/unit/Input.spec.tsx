import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../../src/components/Input'
import { vi } from 'vitest'

describe('Input Component', () => {
  const fakeFn = vi.fn(() => {})

  const setup = () => {
    const utils = render(<Input onChange={fakeFn} aria-label="cost-input" />)
    const input = utils.getByLabelText('cost-input')
    return {
      input,
      ...utils
    }
  }

  it('should render the component onto the screen', () => {
    render(<Input onChange={fakeFn} />)

    expect(screen.getByTestId('input-component')).toBeInTheDocument()
  })

  it('should test value of input', () => {
    const { input } = setup()

    fireEvent.change(input, { target: { value: '23' } })
    expect(input.value).toBe('23')
    fireEvent.change(input, { target: { value: '' } })
    expect(input.value).toBe('')
  })
})
