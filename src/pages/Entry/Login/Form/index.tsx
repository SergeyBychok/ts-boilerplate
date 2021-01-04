import { isEmail, isRequired, minLength, validator } from '@utils/validators'
import React from 'react'
import FormView from './FormView'
import { useHistory } from 'react-router'
import { Form } from 'react-final-form'

export interface Values {
  email: string
  password: string
}

const validSchema = {
  email: [isRequired(), isEmail, minLength(10)],
  password: isRequired(),
}

function LoginForm() {
  const history = useHistory()

  function handleSubmit(values: Values) {
    console.log(values)
    history.push('/')
  }
  function validate(values: Values) {
    return validator<Values>(validSchema, values)
  }
  return <Form render={FormView} validate={validate} onSubmit={handleSubmit} />
}

export default LoginForm
