/** @babel */
/** global PostManager */
import { getPost } from 'viblo-sdk/api/posts'

export default class VibloPostEditor {
    constructor ({ editor, hashId, emptyOnNew = true }) {
        this.textEditor = editor
        this.textEditor.id = hashId
        this.hashId = hashId !== 'untitled' ? hashId : null
        this.emptyOnNew = emptyOnNew
        this.initialize()
        this.registerEvents()
    }

    initialize () {
        this.addVibloIconTabManual()
        if (this.hashId) {
            this.initForEditing()
        } else {
            this.initForCreating()
        }
    }

    addVibloIconTabManual () {
        const pane = atom.workspace.paneForItem(this.textEditor)
        const titleTabBar = `.tab[data-type=TextEditor] .title[data-path="${this.textEditor.getPath()}"]`
        const tab = pane.element.querySelector(titleTabBar)
        if (tab) {
            tab.classList.add('icon')
            tab.classList.add('icon-viblo-logo')
        }
    }

    async initForEditing () {
        const response = await getPost(this.hashId)
        const post = PostManager.normalizePost(response.data)
        if (post) {
            this.setPostEditorTitle(post.title)
            this.textEditor.setText(post.contents)
            this.textEditor.save()
            // Post to store:
            PostManager.put({
                [post.hash_id]: post
            })
        }
    }

    initForCreating () {
        this.setPostEditorTitle('untitled')
        this.textEditor.getPath = () => `${Auth.tokenManager.vibloDir}/p/tmp/untitled.md`
        if (this.emptyOnNew) {
            this.textEditor.setText('')
            this.textEditor.save()
        }
    }

    setPostEditorTitle (title) {
        this.textEditor.getTitle = this.textEditor.getLongTitle = () => `Viblo - ${title}`
        this.textEditor.emitter.emit('did-change-title')
        document.title = this.textEditor.getLongTitle()
    }

    registerEvents () {
        //
    }
}
