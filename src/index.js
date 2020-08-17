import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './Resolvers/Query'
import Mutation from './Resolvers/Mutation'
import Subscription from './Resolvers/Subscription'
import User from './Resolvers/User'
import Post from './Resolvers/Post'
import Comment from './Resolvers/Comment'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers : {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log('The server is up!')
})