/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Markdown from '../widgets/markdown'
import _find from 'lodash/find'
import { File } from 'atom'
import { ATOM_PREVIEW_URI } from '../config'

const DEPLAY_UPDATE_PREVIEW = 800 // ms

export default class VibloMarkdownPreviewPane {
    constructor ({ editorId, filePath, uri }) {
        this.uri = uri
        this.editorId = editorId
        this.filePath = filePath
        this.initialize()
        etch.initialize(this)
    }

    initialize () {
        if (this.editorId) {
            const editor = _find(atom.workspace.getTextEditors(), (editor) => editor.id.toString() === this.editorId)
            if (editor) {
                return this.addPreviewForEditor(editor)
            }
        }

        if (this.filePath) {
            return this.addPreviewForFile()
        }
    }

    addPreviewForEditor (editor) {
        this.filePath = editor.getPath()
        this.contents = editor.getText()
        editor.onDidStopChanging(() => this.onContentsChanged(editor.getText()))
    }

    onContentsChanged (contents) {
        if (this.timeOut) {
            clearTimeout(this.timeOut)
            this.timeOut = null
        }

        this.timeOut = setTimeout(() => this.update({ contents }), DEPLAY_UPDATE_PREVIEW)
    }

    addPreviewForFile() {
        this.editorId = null
        this.uri = `${ATOM_PREVIEW_URI}/${encodeURI(this.filePath)}`
        this.file = new File(this.filePath)
        const loadContents = () => this.file.read().then((contents) => this.onContentsChanged(contents))

        loadContents()
        this.file.onDidChange(() => loadContents())
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
        return 'Viblo Preview'
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
        }
    }
}
