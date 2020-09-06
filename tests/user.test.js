import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase from './utils/seedDatabase'


const client = getClient()

beforeEach(seedDatabase)

test('should create new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Andrew",
                    email: "andrew@example.com",
                    password: "MyPass123"
                }
            ){
                token,
                user {
                    id
                }
            }
        }
    `

    const response = await client.mutate({ mutation: createUser })
    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)

})

test('should expose public author profiles', async () => {
    const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
    `

    const response = await client.query({query: getUsers})

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Jen')
})



test('should not log in with bad credentials', async () => {
    const login = gql`
        mutation {
            login(
                data: {
                    email: "jeff@example.com",
                    password: "alfjadfoelfkje"
                }
            ) {
                token
            }
        }
    `

    await expect(client.mutate({ mutation: login})).rejects.toThrow()
    
})

test('should not sign up with short password', async () => {
    const signup = gql`
        mutation {
            mutation {
            createUser(
                data: {
                    name: "Minh",
                    email: "minh@example.com",
                    password: "one"
                }
            ){
                token,
                user {
                    id
                }
            }
        }
        }
    `
    await expect(client.mutate({ mutation: signup})).rejects.toThrow()
    
})

