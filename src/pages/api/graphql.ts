import { NextApiHandler } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import { RequestHandler } from 'micro'
import Cors from 'micro-cors'

import { context } from '../../../graphql/context'
import { resolvers } from '../../../graphql/resolvers'
import { typeDefs } from '../../../graphql/typeDefs'

const cors = Cors()

export const config = {
  api: {
    bodyParser: false,
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })
const startServer = apolloServer.start()

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  const apolloHandler = await apolloServer.createHandler({
    path: '/api/graphql'
  })
  return apolloHandler(req, res)
}

export default cors(handler as RequestHandler);
