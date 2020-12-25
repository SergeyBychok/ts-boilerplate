import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import localStorageService from '@utils/localStorage'
import config from '@config'

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Authorization: ${localStorageService.token}`,
    },
  }
})
const httpLink = createHttpLink({
  uri: `${config.APP_API_URL}/graphql`,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.error(`[Network error]: ${networkError}`)
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    })
    const { message } = graphQLErrors[0]
    if (message === 'You are not authorized to perform this action.' || message === 'Token is not found') {
      apolloClient.resetStore()
      localStorageService.token = null

      if (window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    }
  }
})
export const apolloClient = new ApolloClient({
  uri: `${config.APP_API_URL}/graphql`,
  cache: new InMemoryCache({
    addTypename: true,
  }),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
})

// apolloClient.defaultOptions.query = {
//   fetchPolicy: 'network-only'
// }
//
// apolloClient.defaultOptions.mutate = {
//   fetchPolicy: 'no-cache'
// }
//
// apolloClient.defaultOptions.watchQuery = {
//   fetchPolicy: 'network-only'
// }

// apolloClient.queryDeduplication = false
