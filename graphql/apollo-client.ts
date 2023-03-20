import { ApolloClient, InMemoryCache } from '@apollo/client'

const isClient = typeof window !== "undefined"

const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.NEXT_PUBLIC_GQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: isClient ? "cache-first" : "no-cache",
      errorPolicy: "all",
    },
  },
})

export default client
