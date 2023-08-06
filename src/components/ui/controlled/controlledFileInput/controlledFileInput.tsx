import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props<T extends FieldValues> = UseControllerProps<T> & { id: string }
export const ControlledFileInput = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...restProps
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return <input {...restProps} type={'file'} value={value} onChange={onChange} />
}
