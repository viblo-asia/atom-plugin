/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import PostHeader from './header'
import PostMetaStatus from './meta-status'

export default class PostItem {
    constructor ({ post }) {
        this.post = post
        etch.initialize(this)
    }

    render () {
        return (
            <div className="posts-list__item post-card">
                <PostHeader post={this.post}/>
                <PostMetaStatus post={this.post}/>
            </div>
        )
    }

    update ({ post }) {
        this.post = post
        etch.update(this)
    }
}
