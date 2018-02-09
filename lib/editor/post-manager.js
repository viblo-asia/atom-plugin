/** @babel */
import _assign from 'lodash/assign'

export default class PostManager {
    constructor () {
        this.posts = {}
    }

    put (posts) {
        this.posts = _assign({}, this.posts, posts)
    }

    normalizePost (post = null) {
        if (post) {
            post.hash_id = post.hash_id || post.slug
        }

        return post
    }
}
