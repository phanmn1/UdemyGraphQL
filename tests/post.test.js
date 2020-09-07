import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo }  from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getPosts, getUserPosts, updatePost, createPost, deletePost } from './utils/operations'

jest.setTimeout(30000);

const client = getClient()

beforeEach(seedDatabase)

test('should only show published posts', async () => {

    const response = await client.query({ query: getPosts })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
})

test('should fetch users posts', async () => {
    const client = getClient(userOne.jwt)

    const { data } = await client.query({ query: getUserPosts})
    expect(data.myPosts.length).toBe(2)
})

test('should be able to update own post', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        id: postOne.post.id,
        data: {
            published: false
        }
    }

    const { data } = await client.mutate({ mutation: updatePost, variables })
    const exists = await prisma.exists.Post({ id: postOne.post.id, published: false})
    expect(exists).toBe(true)
    expect(data.updatePost.published).toBe(false)

})

test('should create a new post', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        data: {
            title: "A test post",
            body: "",
            published: true
        }
    }

    const { data } = await client.mutate({ mutation: createPost, variables })

    expect(data.createPost.title).toBe('A test post')
    expect(data.createPost.body).toBe('')
    expect(data.createPost.published).toBe(true)


})

test('should delete post', async () => {
    const client = getClient(userOne.jwt)

    const variables = {
        id: postTwo.post.id
    }

    await client.mutate({ mutation: deletePost, variables })
    const exists = await prisma.exists.Post({ id: postTwo.post.id })

    expect(exists).toBe(false)

})

