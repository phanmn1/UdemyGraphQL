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
    {id: '1', text: 'Test Comment 1', author: '1', post: '1'},
    {id: '2', text: 'Test Comment 2', author: '1', post: '3'},
    {id: '3', text: 'Test Comment 3', author: '3', post: '2'},
    {id: '4', text: 'Test Comment 4', author: '1', post: '2'},
    {id: '5', text: 'Test Comment 5', author: '3', post: '1'}
]

const db = {
    users,
    posts, 
    comments
}

export { db as default }