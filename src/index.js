import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './Resolvers/Query'
import Mutation from './Resolvers/Mutation'
import User from './Resolvers/User'
import Post from './Resolvers/Post'
import Comment from './Resolvers/Comment'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers : {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('The server is up!')
})