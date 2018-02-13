/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Loading from '../components/loading' // eslint-disable-line no-unused-vars
import PostList from '../components/posts/list' // eslint-disable-line no-unused-vars
import { open_post_editor } from '../helpers'

export default class PostsPanel {
    constructor ({ query = {}, fetch, title }) {
        this.title = title
        this.fetch = fetch
        this.query = query
        this.posts = []
        this.pagination = null
        this.fetchPosts()
        etch.initialize(this)
    }

    async fetchPosts () {
        this.loaded = false
        // eslint-disable-next-line no-undef
        const response = await this.fetch(Auth.user.username, this.query)
        this.loaded = true
        await this.update({
            posts: response.data,
            pagination: response.meta.pagination
        })
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
                            { this.title }
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
                            this.loaded ? <PostList posts={this.posts} pagination={this.pagination}/> : <Loading/>
                        }
                    </div>
                </div>
            </section>
        )
    }

    update ({ posts = [], pagination, query }) {
        this.posts = posts
        this.pagination = pagination
        this.query = query
        etch.update(this)
    }

    onBeforeReactive (props = {}) {
        this.query = props.query
        this.fetchPosts()
    }
}
