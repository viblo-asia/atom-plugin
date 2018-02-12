/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _map from 'lodash/map'
import PostHeader from './post-item/header' // eslint-disable-line no-unused-vars
import PostMetaStatus from './post-item/meta-status' // eslint-disable-line no-unused-vars
import Pagination from '../pagination'

export default class PostList {
    constructor (props = {}) {
        this.initialize(props)
        etch.initialize(this)
    }

    initialize ({ posts = [], pagination }) {
        this.posts = posts
        this.pagination = pagination
    }

    render () {
        return (
            <div>
                <div className="posts-list">
                    { _map(this.posts, (post) => {
                        post = PostManager.normalizePost(post)
                        return (
                            <div className="post-card" style="cursor: default">
                                <PostHeader post={post}/>
                                <PostMetaStatus post={post}/>
                            </div>
                        )
                    })}
                </div>
                {
                    this.pagination ? (
                        <Pagination
                            currentPage={this.pagination.current_page}
                            lastPage={this.pagination.total_pages}
                        />
                    ) : null
                }
            </div>
        )
    }

    update (props) {
        this.initialize(props)
        etch.update(this)
    }
}
