/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _map from 'lodash/map'
import Pagination from '../pagination'
import PostItem from './post-item'

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
                    { _map(this.posts, (post) => <PostItem post={post}/>) }
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
