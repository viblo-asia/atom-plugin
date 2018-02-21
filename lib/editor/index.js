/** @babel */
/** global PostManager */
import { getPost } from 'viblo-sdk/api/posts'

export default class VibloPostEditor {
    constructor ({editor, hashId, emptyOnNew = true}) {
        this.textEditor = editor
        this.textEditor.id = hashId
        this.hashId = hashId !== 'untitled' ? hashId : null
        this.emptyOnNew = emptyOnNew
        this.initialize()
        this.registerEvents()
    }

    initialize () {
        if (this.hashId) {
            this.initForExistsPost()
        } else {
            this.initForNewPost()
        }
    }

    async initForExistsPost () {
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

    initForNewPost () {
        this.setPostEditorTitle('untitled')
        this.textEditor.getPath = () => `${Auth.tokenManager.vibloDir}/tmp/untitled.md`
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
