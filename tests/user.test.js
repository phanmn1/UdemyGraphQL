import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, login, getProfile } from './utils/operations'


const client = getClient()

beforeEach(seedDatabase)

test('should create new user', async () => {
    const variables = {
        data: {
            name: 'Andrew',
            email: 'andrew@example.com',
            password: 'MyPass123'
        }
    }

    const response = await client.mutate({ 
        mutation: createUser,
        variables
    })
    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)

})

test('should expose public author profiles', async () => {
    

    const response = await client.query({query: getUsers})

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Jen')
})



test('should not log in with bad credentials', async () => {
    const variables = {
        data: {
            email: 'jen@example.com',
            password: 'ie;jsdofefw0e9fwef'
        }
    }

    await expect(client.mutate({ mutation: login, variables})).rejects.toThrow()
    
})

test('should not sign up with short password', async () => {
    const variables = {
        data: {
            name: "Minh",
            email: "minh@example.com",
            password: "one"
        }
    }


    await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow()
    
})

test('should fetch user profile', async () => {
    const client = getClient(userOne.jwt)

    

    const { data } = await client.query({ query: getProfile })
    expect(data.me.id).toBe(userOne.user.id)
})

