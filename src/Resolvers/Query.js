const Query = {
    users(parent, args, { prisma }, info) {

        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR : [
                {
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }
                ]
            }
        }

        return prisma.query.users(opArgs, info)
        // if(!args.query) {
        //     return db.users
        // }
        
        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }
        return prisma.query.posts(opArgs, info)
        // if(!args.query) {
        //     return db.posts
        // }

        // return db.posts.filter(post => {
        //     const isTitleMatch = post.title.toLocaleLowerCase().includes(args.query.toLowerCase())
        //     const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLowerCase())
        //     return isBodyMatch || isTitleMatch 
        // })
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
    comments(arent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    }
}

export { Query as default } 