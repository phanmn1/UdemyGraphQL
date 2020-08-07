import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4';

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data 
const users = [
    { id: '1', name: 'Andrew', email: 'andrew@example.com'},
    { id: '2', name: 'Sarah', email: 'sarah@example.com'},
    { id: '3', name: 'Mike', email: 'mike@example.com'}
]

const posts = [
    {id: '1', title: 'On how to detail graphql queries', body: 'Ipsum lorum bla bla bla', published: false, author: '1'},
    {id: '2', title: 'Testing CI/CD dependencies', body: 'First off why do I need to do graphql', published: true, author: '2'},
    {id: '3', title: 'GraphQL Intro course', body: 'adfadfadfadfasdfasdf', published: true, author: '2'}
    
]

const comments = [
    {id: '1', text: 'Test Comment 1', author: '2', post: '1'},
    {id: '2', text: 'Test Comment 2', author: '1', post: '3'},
    {id: '3', text: 'Test Comment 3', author: '3', post: '2'},
    {id: '4', text: 'Test Comment 4', author: '1', post: '2'}
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!) : Post! 
        createComment(text: String!, author: ID!, post: ID!) : Comment!

    }

    input CreateUserInput {
        name: String! 
        email: String! 
        age: Int
    }

    type User {
        id: ID!
        name: String! 
        email: String!
        age: Int,
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String! 
        author: User!
        post: Post!
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
        comments() {
            return comments
        }
    }, 

    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email)

            if(emailTaken) {
                throw new Error('Email taken')
            }

            const user = {
                id: uuidv4(), 
                ...args.data
            }

            users.push(user)
            return user
        }, 
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)

            if(!userExists) {
                throw new Error('User not found')
            }

            const post = {
                id: uuidv4(), 
                ...args
            }

            posts.push(post)
            return post
        }, 
        createComment(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)
            const postExists = posts.some((post) => {post.id === args.post && post.published})
            
            if(!postExists || !userExists) 
                throw new Error('User or post does not exist')

            const comment = {
                id: uuidv4(), 
                ...args
            }

            comments.push(comment)
            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.author == parent.id)
        }

    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        }, 
        post(parent, args, ctx, info) {
            return posts.find((post) => post.id === parent.post)
        }
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})