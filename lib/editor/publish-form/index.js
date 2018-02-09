/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import {TextEditorView} from 'atom-space-pen-views'
import _map from 'lodash/map'
import _each from 'lodash/each'
import _keys from 'lodash/keys'
import _omit from 'lodash/omit'
import _first from 'lodash/first'
import _assign from 'lodash/assign'
import _trim from 'lodash/trim'
import { saveAsDraft, saveAndPublish } from 'viblo-sdk/api/publish'
import Notification from '../../widgets/notification'
import Validator from 'validatorjs'
import Repository from './repository'
import {
    STATUS_DRAFT,
    STATUS_DRAFT_PUBLIC,
    STATUS_PUBLIC
} from '../../config/post-status'

export default class PublishForm {
    constructor (options = {}) {
        this.initialize(options)
        etch.initialize(this)
        this.attachEvents()
    }

    initialize ({ initialData, id, post = null }) {
        this.id = id
        this.initialData = initialData
        this.post = new Repository({ post })

        this.form = post ? this.post.toFormData() : {
            title: '',
            tags: '',
            category_id: 2,
            locale_code: 'vi',
            status: STATUS_PUBLIC,
            publicDraft: false
        }
        this.labels = this.generateBtnLabels()
    }

    generateBtnLabels () {
        return {
            btnPublish: this.post.isset() ? 'Update and Publish' : 'Publish Now',
            btnDraft: this.form.publicDraft
                ? 'Save as Public Draft'
                : (
                    !this.post.isset() || !this.post.isPublicDraft()
                        ? 'Save as Draft'
                        : 'Save as Public Draft'
                )
        }
    }

    update () {
        etch.update(this)
    }

    attachEvents () {
        const title = this.refs.title.getModel()
        const tags = this.refs.tags.getModel()

        title.setText(this.form.title)
        tags.setText(this.form.tags)

        title.onDidStopChanging(() => this.form.title = title.getText())
        tags.onDidStopChanging(() => this.form.tags = _trim(tags.getText(), ','))
    }

    onDidClickDraftButton () {
        if (this.form.publicDraft) {
            this.form.status = STATUS_DRAFT_PUBLIC
        } else {
            this.form.status = !this.post.isset() || !this.post.isPublicDraft()
                ? STATUS_DRAFT
                : STATUS_DRAFT_PUBLIC
        }

        return this.onSave()
    }

    onDidClickPublishButton () {
        this.form.status = STATUS_PUBLIC
        this.onSave()
    }

    close () {
        atom.workspace.panelForItem(this).hide()
    }

    onSave () {
        const data = this.getData()
        const validator = this.validator(data)
        if (validator.fails()) {
            return this.handleErrors(validator.errors.errors)
        } else if (this.errors) {
            this.hiddenErrorMessages(_keys(this.form))
        }

        return this.save(data)
    }

    save (data) {
        // clear current error:
        this.errors = {}
        const save = this.form.status === STATUS_PUBLIC ? saveAndPublish : saveAsDraft
        return save(data)
            .then(() => {
                Notification.success('Success', 'Your post is saved successfully.')
                this.close()
            })
            .catch((e) => {
                if (e.response && e.response.data.errors) {
                    this.handleErrors({ errors: e.response.data.errors })
                } else {
                    Notification.error('Failed', 'Something went wrong. Can not save your post.')
                    this.close()
                }
            })
    }

    handleErrors (errors) {
        // Save current errors:
        this.errors = errors
        // passedFields are keys that don't have in errors:
        const passedFields = _keys(_omit(this.form, _keys(errors)))
        this.hiddenErrorMessages(passedFields)
        this.displayErrors(errors)
    }

    hiddenErrorMessages (fields) {
        _each(fields, (field) => {
            const alert = this.element.querySelector(`#error_${field}`)
            if (alert) {
                alert.innerHTML = ''
                this.setFormGroupError(alert, true)
            }
        })
    }

    displayErrors (errors) {
        _each(errors, (messages, field) => {
            let alert = this.element.querySelector(`#error_${field}`)
            let msg = _first(messages)
            if (!alert) {
                this.refs[field].after(`<div id="error_${field}" class="control-label">${msg}</div>`)
            } else {
                alert.innerHTML = msg
            }

            this.setFormGroupError(this.element.querySelector(`#error_${field}`), false)
        })
    }

    setFormGroupError (alert, remove = false) {
        const formGroup = alert.closest('.form-group')
        if (formGroup) {
            if (!remove) {
                formGroup.classList.add('has-error')
            } else {
                formGroup.classList.remove('has-error')
            }
        }
    }

    validator (data) {
        return new Validator(data, {
            title: 'required',
            category_id: 'required|integer',
            locale_code: 'required',
            contents: 'required',
            status: 'required|in:public,draft,draft_public'
        })
    }

    getData () {
        const contents = this.getContents()
        return _assign(this.form, { contents })
    }

    getContents () {
        return atom.workspace.getActiveTextEditor().getText()
    }

    render () {
        return (
            <div id={this.id} className="publish-form">
                <div className="body">
                    <h1 className="heading-title">Post's Information</h1>
                    <div className="submit-loader">
                        <span className="loading loading-spinner-large inline-block"></span>
                        <h4>publishing in progress...</h4>
                    </div>
                    <div className="content">
                        <div className="row form-group">
                            <div className="editor-container">
                                <label for="post-title" className="control-label">
                                    Title <span className="text-required">(*)</span>:
                                </label>
                                <TextEditorView
                                    ref="title"
                                    id="post-title"
                                    mini={true}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="editor-container">
                                <label for="post-tags" className="control-label">
                                    Tags (e.g.&nbsp;
                                    <a className="tag-example">
                                        PHP, Javascript, CSS
                                    </a>):
                                </label>
                                <TextEditorView
                                    ref="tags"
                                    id="post-tags"
                                    mini={true}
                                    value={this.form.tags}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label for="category_id" className="control-label">
                                Category <span className="text-required">(*)</span>:
                            </label>
                            <select
                                ref="category_id"
                                id="category_id"
                                className="form-control"
                                onChange={({target}) => {
                                    this.form.locale_code = target.selectedOptions[0].value
                                }}
                            >
                                {
                                    _map(this.initialData.categories, (category) => (
                                        <option
                                            value={category.id}
                                            selected={this.form.category_id === category.id}
                                        >
                                            {category.title}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="row form-group">
                            <label for="locale_code" className="control-label">
                                Language <span className="text-required">(*)</span>:
                            </label>
                            <select
                                ref="locale_code"
                                id="locale_code"
                                className="form-control"
                                onChange={({target}) => {
                                    this.form.locale_code = target.selectedOptions[0].value
                                }}
                            >
                                {
                                    _map(this.initialData.locales, (locale) => (
                                        <option
                                            value={locale.locale_code}
                                            selected={this.form.locale_code === locale.locale_code}
                                        >
                                            {locale.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="row form-group">
                            <label
                                for="sharing"
                                className="control-label"
                                style="display:flex;cursor:pointer"
                            >
                                <input
                                    id="sharing"
                                    type="checkbox"
                                    checked={this.form.publicDraft}
                                    onChange={(e) => {
                                        this.form.publicDraft = e.target.checked
                                        this.labels = this.generateBtnLabels()
                                        this.element.querySelector('.btn-draft').innerHTML = this.labels.btnDraft
                                    }}
                                />
                                <span className="ml-05">
                                    Anyone with the liink can see the drafted version of this post.
                                </span>
                            </label>
                        </div>
                        <div className="row form-group space-between mt-1">
                            <div>
                                <button
                                    className="btn btn-draft"
                                    onClick={() => this.onDidClickDraftButton()}
                                >
                                    {this.labels.btnDraft}
                                </button>
                                <button
                                    className="btn btn-publish ml-05"
                                    onClick={() => this.onDidClickPublishButton()}
                                >
                                    {this.labels.btnPublish}
                                </button>
                            </div>
                            <button
                                className="btn"
                                onClick={() => this.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
