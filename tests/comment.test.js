import 'cross-fetch/polyfill'
import seedDatabase, { userOne, commentOne, commentTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import { deleteComment } from './utils/operations'

jest.setTimeout(30000);
const client = getClient()

beforeEach(seedDatabase)

test('shold delete own comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentTwo.comment.id
    }

    await client.mutate({ mutation: deleteComment, variables})
    const exists = await prisma.exists.Comment({ id: commentTwo.comment.id })
    expect(exists).toBe(false)
})

test('should not delete other users comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentOne.comment.id
    }
    await expect(
        client.mutate({ mutation: deleteComment, variables})
    ).rejects.toThrow()
})