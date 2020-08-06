import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data 
const users = [
    { id: '1', name: 'Andrew', email: 'andrew@example.com'},
    { id: '2', name: 'Sarah', email: 'sarah@example.com'},
    { id: '3', name: 'Mike', email: 'mike@example.com'}
]

const posts = [
    {id: '1', title: 'On how to detail graphql queries', body: 'Ipsum lorum bla bla bla', published: false},
    {id: '2', title: 'Testing CI/CD dependencies', body: 'First off why do I need to do graphql', published: true}
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String! 
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }

            return posts.filter(post => {
                const isTitleMatch = post.title.toLocaleLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLowerCase())
                return isBodyMatch || isTitleMatch 
            })
        },
        me() {
            return {
                id: '123098',
                name: 'Mike', 
                email: 'Mike@example.com',
                age: 28
            }
        },
        post() {
            return {
                id: '123abc',
                title: 'Book1',
                body: 'Body1',
                published: true
            }
        }, 
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})