import  { Resolvers } from './resolvers-types'

export const resolvers: Resolvers = {
  Query: {
    customers: async (parent, args, ctx) => await ctx.prisma.customer.findMany()
  }
}
