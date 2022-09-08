import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: any
  onChange?: (e: any) => void
}

export const Input = ({ value, onChange, ...rest }: InputProps) => {
  return (
    <div className="flex my-5 justify-start items-center border-b-2 border-brand-500 dark:border-transparent dark:bg-gray-400 w-auto h-12 py-2.5 pl-2 gap-2">
      <input data-testid='input-component' value={value} onChange={onChange} {...rest} />
    </div>
  )
}
