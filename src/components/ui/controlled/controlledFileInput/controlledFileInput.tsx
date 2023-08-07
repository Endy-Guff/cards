import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type Props<T extends FieldValues> = UseControllerProps<T> & {
  id: string
  changeEditMode: (editMode: boolean) => void
  setAvatar: (file: File) => void
}
export const ControlledFileInput = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  changeEditMode,
  setAvatar,
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

  return (
    <input
      {...restProps}
      type={'file'}
      value={value?.fileName}
      onChange={e => {
        changeEditMode(true)
        onChange(e.target.files![0])
        setAvatar(e.target.files![0])
      }}
    />
  )
}
