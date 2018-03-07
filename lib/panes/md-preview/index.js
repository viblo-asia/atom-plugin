/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Markdown from '../../components/markdown'
import _find from 'lodash/find'
import { File } from 'atom'
import { ATOM_PREVIEW_URI } from '../../config'

const DEPLAY_UPDATE_PREVIEW = 800 // ms

export default class VibloMarkdownPreviewPane {
    constructor ({ editorId, filePath, uri, contents = '' }) {
        this.uri = uri
        this.editorId = editorId
        this.filePath = filePath
        this.contents = contents
        this.initialize()
        etch.initialize(this)
    }

    initialize () {
        if (this.editorId) {
            const editor = _find(atom.workspace.getTextEditors(), (editor) => editor.id.toString() === this.editorId)
            if (editor) {
                return this.previewFromEditor(editor)
            }
        }

        if (this.filePath) {
            return this.previewFromFile()
        }
    }

    previewFromEditor (editor) {
        this.filePath = editor.getPath()
        this.contents = editor.getText()
        this.title = editor.getTitle().replace('Viblo - ', '')
        editor.onDidStopChanging(() => this.onContentsChanged(editor.getText()))
    }

    onContentsChanged (contents) {
        if (this.timeOut) {
            clearTimeout(this.timeOut)
            this.timeOut = null
        }

        this.timeOut = setTimeout(() => this.update({ contents }), DEPLAY_UPDATE_PREVIEW)
    }

    previewFromFile () {
        this.editorId = null
        this.uri = `${ATOM_PREVIEW_URI}/${encodeURI(this.filePath)}`
        this.file = new File(this.filePath)
        this.title = this.filePath
        // Load file contents:
        this.file.read().then(contents => this.onContentsChanged(contents))
        this.file.onDidChange(() => this.file.read().then(contents => this.onContentsChanged(contents)))
    }

    render () {
        return (
            <section className="post-view viblo-markdown-preview pane-item">
                <Markdown contents={this.contents}/>
            </section>
        )
    }

    update ({ contents }) {
        this.contents = contents
        etch.update(this)
    }

    getTitle () {
        return `Viblo Preview - ${this.title}`
    }

    getPath () {
        return this.filePath
    }

    getIconName () {
        return 'viblo-logo'
    }

    serialize () {
        return {
            deserializer: 'VibloMarkdownPreviewPane',
            editorId: this.editorId,
            uri: this.uri,
            filePath: this.filePath,
            contents: this.contents
        }
    }
}
