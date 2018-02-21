/** @babel */
import _assign from 'lodash/assign'
import _map from 'lodash/map'
import { Emitter } from 'atom'

export default class PostManager {
    constructor () {
        this.posts = {}
        this.emitter = new Emitter()
    }

    put (posts) {
        this.posts = _assign({}, this.posts, posts)
    }

    normalizePost (post) {
        if (!post) {
            return null
        }

        post.hash_id = post.hash_id || post.slug

        return post
    }

    normalizePosts (posts = []) {
        return _map(posts, (post) => this.normalizePost(post))
    }

    onDidDeletePost (callback) {
        this.emitter.on('did-delete-post', callback)
    }
}
