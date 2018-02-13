/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import { humanize_time } from '../../../helpers'
import { deletePost } from 'viblo-sdk/api/posts'

export default class Meta {
    constructor ({ post, format = '' }) {
        this.post = post
        this.isIncludeTime = format === 'include-time'
        etch.initialize(this)
    }

    render () {
        return this.post.is_published
            ? this.renderPublishedPost()
            : this.renderDraftPost()
    }

    renderPublishedPost () {
        const className = this.isIncludeTime
            ? 'post-card__status space-between post-meta--include-time'
            : 'post-card__status space-between'

        return (
            <div className={className}>
                { this.isIncludeTime
                    ? (
                        <span className="published-date">
                            <i className="fa fa-calendar mr-1"></i>
                        { humanize_time(this.post.updated_at) }
                        </span>
                    ) : null
                }
                <div className="meta-status">
                    <span className="meta-status__item">
                        <i className="fa fa-eye"></i>
                        { this.post.views_count || 0 }
                    </span>
                    <span className="meta-status__item">
                        <i className="fa fa-paperclip"></i>
                        { this.post.clips_count || 0 }
                    </span>
                    <span className="meta-status__item">
                        <i className="fa fa-comments"></i>
                        { this.post.comments_count || 0 }
                    </span>
                </div>
                { this.post.points !== undefined
                    ? (
                        <div className="points">
                            <div className="carets">
                                <i className="fa fa-caret-up"></i>
                                <i className="fa fa-caret-down"></i>
                            </div>
                            <span className="point-score">
                                    { this.post.points }
                            </span>
                        </div>
                    ) : null
                }
            </div>
        )
    }

    renderDraftPost () {
        return (
            <div className="post-card__status d-flex space-between">
                <span className="post-card__status__label text-muted">
                    Last edit: { humanize_time(this.post.updated_at) }
                </span>
                <span className="post-card__status__icons">
                    <i
                        title="Delete post"
                        className="post-card__status__icon fa fa-trash"
                        onClick={() => this.onDelete()}
                    />
                </span>
            </div>
        )
    }

    onDelete () {
        const msg = `Do you really want to delete this post: "${this.post.title}"?`
        const confirm = window.confirm(msg)
        if (confirm) {
            return deletePost(this.post.hash_id)
                .then(() => PostManager.emitter.emit('did-delete-post', this.post))
                .catch(() => {})
        }
    }

    update ({ post, format = ''}) {
        this.post = post
        this.format = format
        etch.update(this)
    }
}
