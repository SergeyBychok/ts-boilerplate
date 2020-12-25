import React from 'react'
import { Field, FieldRenderProps } from 'react-final-form'

import { Label, Error } from '../styles'
import { Container } from './styles'

interface IInput {
  disabled?: boolean
  label?: string
  name: string
  placeholder?: string
  type?: string
}

const renderField = ({ input, meta, label, placeholder, type, disabled, ...rest }: FieldRenderProps<string>) => {
  const isError = (meta.touched && meta.error) || (meta.submitFailed && meta.error)
  return (
    <Container error={!!isError} isDisabled={disabled}>
      {label && <Label error={!!isError}>{label}</Label>}
      <input type={type} {...input} {...rest} placeholder={placeholder} disabled={disabled} />
      {isError && <Error>{meta.error}</Error>}
    </Container>
  )
}

const Input = ({ label, name, placeholder, type = 'text', disabled, ...rest }: IInput) => (
  <Field
    disabled={disabled}
    label={label}
    name={name}
    placeholder={placeholder}
    render={renderField}
    type={type}
    {...rest}
  />
)

export default Input
