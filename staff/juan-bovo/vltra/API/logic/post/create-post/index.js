const { models: { User, Post } } = require('vltra-data')
const { validate} = require('vltra-utils')


module.exports = function(title, body, author, date, comments, votes) {

    validate.string(title, 'title')
    validate.string(body, 'body')
    validate.objectId(author, 'author')
    validate.date(date, 'date')
    validate.array(comments, 'comments')
    validate.array(votes, 'votes')
    
    return (async () => {
        const post = await Post.findOne({ body })
        
        if (post) throw Error(`post with content ${body} already exists`)
            
        const newPost = new Post({
            title, 
            body, 
            date, 
            comments, 
            votes
        })
        newPost.author = author
        debugger
        await  newPost.save()

        const response = await Post.findOne({ body })

        if (!response) throw new Error(`post with content ${body} does not exist`)
        newPostId = response._id.toString()
        return newPostId

    })()
}