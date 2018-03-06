/** @babel */
import App from './panes/app'
import showPanel from './panels/show-panel'
import { open_workspace, open_post_editor } from './helpers'
import { TextEditor } from 'atom'
import VibloEditor from './components/editor'
import { togglePublishForm } from './components/publish-form/toggle'
import { ATOM_APP_URI, ATOM_PREVIEW_URI, REGEX_POST_EDITOR } from './config'
import togglePreview from './panes/md-preview/toggle'
import toggleImageFinder from './components/image-finder/toggle'
import PostManager from './components/post-manager'
import VibloMarkdownPreviewPane from './panes/md-preview'
import VibloAuth from './auth'

let appInstance = null
window.PostManager = new PostManager()
window.Auth = new VibloAuth()
window.Notification = require('./components/notification')

export default {
    createAppInstance (params) {
        if (appInstance === null) {
            appInstance = new App(params)
            Auth.onDidChangeAuth(() => appInstance.initializePanels())
        }

        return appInstance
    },

    createVibloEditor ({ path }) {
        const matched = REGEX_POST_EDITOR.exec(path)
        const hashId = matched && matched[1] !== 'untitled' ? matched[1] : null

        return new VibloEditor({ path, hashId }).build()
    },

    createVibloMarkdownPreviewPane (options) {
        const { uri, editorId } = options

        // Found editorId:
        if (editorId) {
            return new VibloMarkdownPreviewPane(options)
        }

        // Not found editorId when click ctrl+alt+v:
        let pathFromURI = decodeURI(uri.split('viblo-preview://md/')[1])
        const existsEditor = /^editor\/([a-zA-Z0-9]+)/.exec(pathFromURI)
        options.editorId = existsEditor ? existsEditor[1] : null

        return new VibloMarkdownPreviewPane(options)
    },

    activate () {
        // Add workspace opener:
        this.addWorkspaceOpener()
        // Register command that toggles this viewREGEX_POST_EDITOR
        this.registerCommands()
    },

    addWorkspaceOpener () {
        // Current URI is matched with correct Panel by Opener:
        atom.workspace.addOpener((uri) => {
            // Is Post editor request:
            if (REGEX_POST_EDITOR.exec(uri)) {
                return this.createVibloEditor({ path: uri })
            }

            if (uri.startsWith(ATOM_PREVIEW_URI)) {
                return this.createVibloMarkdownPreviewPane({ uri })
            }

            if (!uri.startsWith(ATOM_APP_URI)) {
                return
            }

            // Create and show Viblo panels:
            appInstance = this.createAppInstance({ uri })
            showPanel(appInstance, uri)

            return appInstance
        })
    },

    registerCommands () {
        // eslint-disable-next-line no-undef
        atom.commands.add('atom-workspace', {
            'viblo:open': () => open_workspace('/publish-posts'),
            'viblo:publish-posts': () => open_workspace('/publish-posts'),
            'viblo:draft-posts': () => open_workspace('/draft-posts'),
            'viblo:gallery': () => open_workspace('/gallery'),
            'viblo:create-post': () => open_post_editor(),
            'viblo:settings': () => open_workspace('/settings'),
            'viblo:about': () => open_workspace('/about'),
        })
        atom.commands.add('atom-text-editor[data-grammar*="gfm"]', {
            'viblo:save-post': async () => await togglePublishForm(atom.workspace.getActiveTextEditor().id),
            'viblo:toggle-preview': () => togglePreview(),
            'viblo:image-helper': () => toggleImageFinder(),
        })
    }
}
