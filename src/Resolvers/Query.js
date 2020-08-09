const Query = {
    users(parent, args, {db}, info) {
        if(!args.query) {
            return db.users
        }
        
        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        }

        return db.posts.filter(post => {
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
        return db.comments
    }
}

export { Query as default } 