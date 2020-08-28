import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'thisismysupersecrettext',
    fragmentReplacements
})

export { prisma as default }

// const createPostForUser = async (authorId, data ) => {
//     const userExists = await prisma.exists.User({ id: authorId})

//     if(!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }, 
//     }, '{ author { id name email posts { id title published }} }')
//     return post
// }

// // createPostForUser('cke4jsfm1011o0933t440y883', {
// //     title: "Great books to read",
// //     body: "The war of art", 
// //     published: true
// // })
// // .then((user) => {
// //     console.log(JSON.stringify(user, undefined, 2))
// // }).catch((error) => {
// //     console.log(error.message)
// // })

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({ id: postId })

//     if(!postExists) {
//         throw new Error('Post does not exist')
//     }

//     const post = await prisma.mutation.updatePost({
//         data,
//         where: {
//             id: postId
//         }
//     }, '{ author { id name email posts { id title published } } }')


//     return post.author
// }

// updatePostForUser('cke4q6q6q01lq0adfadfadf', {
//     title: "Test Update Post for user"
// }).then((post) => {
//     console.log(JSON.stringify(post, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })


