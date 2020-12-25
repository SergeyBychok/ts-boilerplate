import Input from '@common/FormElements/Input'
import React from 'react'
import { FormRenderProps } from 'react-final-form'
import { Values } from './'

function FormView({ handleSubmit, submitting, submitError }: FormRenderProps<Values>) {
  return (
    <form onSubmit={handleSubmit}>
      <Input label="email" name="email" />
      <Input label="password" name="password" />
      <button disabled={submitting} type="submit">
        submit
      </button>
      {submitError && <div>{submitError}</div>}
    </form>
  )
}

export default FormView
