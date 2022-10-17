import { ChangeEvent } from "react"
import { Controller, FieldValues } from "react-hook-form"

import { FormFieldProps } from "./FormField.interfaces"

export const FormField = <T extends FieldValues = FieldValues>(props: FormFieldProps<T>): JSX.Element => {
  const {
    ExtraElement,
    className,
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    label,
    children,
    infoText,
    onChange: change,
    ...rest
  } = props

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState: { error } }) => {
        const onChange = (event: ChangeEvent<HTMLInputElement>, ...rest: any[]) => {
          if (!change) return field.onChange(event, ...rest)

          if (event.target) {
            const { type, checked, value } = event.target
            const val = type === "checkbox" ? checked : value
            return field.onChange(change ? change(val, ...rest) : val)
          }

          if (change) return field.onChange(change(event))

          return field.onChange(event, ...rest)
        }

        return (
          <label className={`block ${className}`} {...rest}>
            {label && <div className="mb-2 leading-none">{label}</div>}
            {typeof children === "function"
              ? children({ ...field, error, checked: field.value, onChange })
              : { ...children, props: { ...field, error, checked: field.value, onChange, ...children.props } }}
            <div className="flex items-center justify-between text-xs">
              <div className={`text-red-600 transition-[height] h-4 ${error?.message ? "mt-1" : "h-0"}`}>
                <span>{error?.message}</span>
              </div>
              {infoText && <div className="italic text-gray-500 mt-1">{infoText}</div>}
            </div>
            {ExtraElement?.(field)}
          </label>
        )
      }}
    />
  )
}
