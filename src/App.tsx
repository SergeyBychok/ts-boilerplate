import { ApolloClient, ApolloProvider } from '@apollo/client'
import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { renderRoutes } from 'react-router-config'
import { Router } from 'react-router'
import { History } from 'history'

import routes from './routes'
import GlobalStyle from './globalStyle'

interface Props {
  history: History
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apolloClient: ApolloClient<any>
}

function App({ history, apolloClient }: Props) {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />
        <Router history={history}>{renderRoutes(routes)}</Router>
      </ApolloProvider>
    </>
  )
}

export default hot(App)
