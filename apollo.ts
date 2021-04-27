import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { offsetLimitPagination } from '@apollo/client/utilities'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const isLoggedInVar = makeVar(false)
export const tokenVar = makeVar('')

const TOKEN = 'token'

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token)
  isLoggedInVar(true)
  tokenVar(token)
}

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN)
  isLoggedInVar(false)
  tokenVar('')
}

const httpLink = createHttpLink({
  uri: 'http://e2c2a3688868.ngrok.io/graphql',
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: tokenVar(),
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          //하단 상단 같은 동작의 코드
          seeFeed: offsetLimitPagination(),
          // seeFeed: {
          //   keyArgs: false,
          //   merge(existing = [], incoming = []) {
          //     return [...existing, ...incoming]
          //   },
          // },
        },
      },
    },
  }),
})

export default client
