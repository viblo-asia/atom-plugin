/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Loading from '../widgets/loading' // eslint-disable-line no-unused-vars
import {getUserPosts} from 'viblo-sdk/api/users'
import PostList from '../widgets/posts/list' // eslint-disable-line no-unused-vars
import {open_post_editor} from '../helpers'

export default class PublishPostsPanel {
    constructor (options = {}) {
        this.posts = options.posts || []
        this.pagination = options.pagination || null
        this.fetchPosts()
        etch.initialize(this)
    }

    async fetchPosts () {
        this.loaded = false
        // eslint-disable-next-line no-undef
        const response = await getUserPosts(Auth.user.username)
        this.posts = response.data
        this.pagination = response.meta.pagination
        this.loaded = true
        await this.update()
    }

    render () {
        return (
            <section className="section publish-post-panel">
                <div className="section-container">
                    <div
                        className="section-heading space-between"
                        style="display:flex;align-items: center;"
                    >
                        <span>
                            Publish Posts
                            <i
                                title="Click to refresh"
                                className="fa fa-refresh text-muted btn-refresh"
                                onClick={() => this.fetchPosts()}
                            />
                        </span>
                        <button
                            className="btn"
                            style="font-size: 1.3rem;"
                            onClick={() => open_post_editor()}
                        >
                            Create post
                        </button>
                    </div>
                    {
                        this.loaded && !this.posts.length
                            ? <div>
                                <h3>Your post list is empty</h3>
                            </div> : null
                    }
                    <div className="section-body">
                        {
                            !this.loaded ? <Loading/> : <PostList posts={this.posts}/>
                        }
                    </div>
                </div>
            </section>
        )
    }

    update () {
        etch.update(this)
    }
}
