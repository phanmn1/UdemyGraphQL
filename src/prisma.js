import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query.users(null, '{ id name posts { id title }}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{id text author {id name}}').then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createPost({
//     data: {
//         title: "My new GraphQL post is live 2",
//         body: "You can find the new course here", 
//         published: true,
//         author: {
//             connect: {
//                 id: "cke4jsfm1011o0933t440y883"
//             }
//         }
//     }
// }, '{ id title body published }').then(data => {
//     console.log(data)
//     return prisma.query.users(null, '{ id name posts { id title }}')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

prisma.mutation.updatePost({
    data: {
        body: "You can no longer find this post",
        published: false
    }, 
    where: {
        id: "cke4q7zyd01lw09330ian9zdr"
    }
}, '{ id title body }').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
    return prisma.query.posts(null, '{ id title body published }')
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})