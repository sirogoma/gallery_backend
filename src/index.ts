import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { UserResolver } from './resolver/userResolver'
import { GallaryResolver } from './resolver/gallaryResolver'

async function startApolloServer() {
  // タイプ定義と、リゾルバの一覧をとっている
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver, GallaryResolver]
  })

  // 一覧をスキーマ定義に渡している
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema
  })

  await new Promise<void>((resolve) => server.listen({ port: 4000 }, resolve)).then(() => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  })
}

startApolloServer()
