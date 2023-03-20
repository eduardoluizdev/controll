import  { Resolvers } from './resolvers-types'

export const resolvers: Resolvers = {
  Query: {
    customers: async (_parent, _args, ctx) => await ctx.prisma.customer.findMany()
  },
  Mutation: {
    createCustomer: async (_parent, args, ctx) => {
      const { name, email } = args
      return await ctx.prisma.customer.create({ data: { name, email } })
    },
    deleteCustomer: async (_parent, args, ctx) => {
      const { id } = args
      return await ctx.prisma.customer.delete({ where: { id } })
    }
  }
}
