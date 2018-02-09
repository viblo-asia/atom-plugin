/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import {humanize_time} from '../../../helpers'

export default class Meta {
    constructor ({post, format = ''}) {
        this.post = post
        this.format = format
        etch.initialize(this)
    }

    render () {
        return this.post.is_published
            ? (
                <div className={
                    this.format === 'include-time'
                        ? 'post-meta space-between post-meta--include-time'
                        : 'post-meta space-between'
                }>
                    { this.format === 'include-time'
                        ? <span className="published-date">
                            <i className="fa fa-calendar mr-1"></i>
                            {humanize_time(this.post.updated_at)}
                        </span>
                        : null
                    }
                    <div className="meta-status">
                        <span className="meta-status__item">
                            <i className="fa fa-eye"></i>
                            {this.post.views_count || 0}
                        </span>
                        <span className="meta-status__item">
                            <i className="fa fa-paperclip"></i>
                            {this.post.clips_count || 0}
                        </span>
                        <span className="meta-status__item">
                            <i className="fa fa-comments"></i>
                            {this.post.comments_count || 0}
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
                                    {this.post.points}
                                </span>
                            </div>
                        ) : null
                    }
                </div>
            )
            : (
                <div className="meta-status">
                    <span className="text-muted">
                        Last edit: {humanize_time(this.post.updated_at)}
                    </span>
                </div>
            )
    }

    update ({ post, format = ''}) {
        this.post = post
        this.format = format
        etch.update(this)
    }
}
