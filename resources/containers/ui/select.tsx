import React from 'react'
import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select'
import { browseByKeyString } from '#resources/lib/utils'

type Option = {
  label: string
  value?: string
}

export interface SelectProps<TForm> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  options: Option[]
  errors: TForm
  data: TForm
  setData: SetDataByKeyValuePair<TForm>
}

type SetDataByKeyValuePair<TForm> = <K extends keyof TForm>(key: K, value: TForm[K]) => void

type TForm = any

const Select = React.forwardRef<HTMLSelectElement, SelectProps<TForm>>(
  ({ data, setData, errors, options = [], ...props }, ref) => {
    const error = `${browseByKeyString(errors, props?.name) || ''}`
    const currentValue = `${browseByKeyString(data, props?.name) || ''}`

    console.log('select', options, props)

    return (
      <div>
        <SelectComponent
          ref={ref}
          id={props.name}
          value={currentValue}
          onSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setData(props?.name, e.target.value)
          }
          {...props}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map(({ label, value }) => {
                !value ? (
                  <SelectLabel>{label}</SelectLabel>
                ) : (
                  <SelectItem value={value}>{label}</SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </SelectComponent>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
