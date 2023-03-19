import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { UserResolver } from './resolver/userResolver'
import { GalleryResolver } from './resolver/galleryResolver'
import { WorkResolver } from './resolver/workResolver'
import { WorkPageResolver } from './resolver/workPageResolver'

async function startApolloServer() {
  // タイプ定義と、リゾルバの一覧をとっている
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver, GalleryResolver, WorkResolver, WorkPageResolver]
  })

  // 一覧をスキーマ定義に渡している
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema
  })

  await new Promise<void>((resolve) => server.listen({ port: 4000 }, resolve)).then(() => {
    console.log(`🚀🚀🚀🚀🚀 Server ready at http://localhost:4000/graphql`)
  })
}

startApolloServer()
