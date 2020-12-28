import React from 'react'
import Form from './Form'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
      <h1>Login page</h1>
      <Link to="/register">register</Link>
      <br />
      <Link to="/login">login</Link>
      <Form />
    </div>
  )
}

export default Login
