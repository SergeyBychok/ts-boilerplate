import React from 'react'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'

function Layout(props: RouteConfigComponentProps) {
  return (
    <>
      <Link to="/login">login</Link>
      <br />
      <Link to="/register">register</Link>
      <br />
      {renderRoutes(props.route?.routes)}
    </>
  )
}

export default Layout
