/** @babel */
import _join from 'lodash/join'
import _map from 'lodash/map'
import {
    STATUS_DRAFT,
    STATUS_DRAFT_PUBLIC,
    STATUS_PUBLIC
} from '../../config/post-status'

const mapSEOLocaleCode = {
    'vi_VN': 'vi',
    'en_US': 'en',
    'ja_JP': 'ja'
}

export default class Repository {
    constructor ({ post = null }) {
        this.post = post
    }

    toFormData () {
        return !this.post ? {} : {
            title: this.post.title,
            tags: _join(_map(this.post.tags.data, (tag) => tag.name), ', '),
            category_id: this.post.category_id || 2,
            locale_code: mapSEOLocaleCode[this.post.seo.locale_code] || 'vi',
            status: this.post.status,
            publicDraft: this.isPublicDraft(),
            slug: this.post.hash_id
        }
    }

    isset () {
        return !!this.post
    }

    isPublish () {
        return this.post && this.post.status === STATUS_PUBLIC
    }

    isDraft () {
        return this.post && this.post.status === STATUS_DRAFT
    }

    isPublicDraft () {
        return this.post && this.post.status === STATUS_DRAFT_PUBLIC
    }
}
