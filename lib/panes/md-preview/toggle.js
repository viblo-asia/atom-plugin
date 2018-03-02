/** @babel */
import VibloMarkdownPreviewPane from './index'
import _find from 'lodash/find'
import { ATOM_PREVIEW_URI } from '../../config'

let attachEvent = false

const isVibloPreviewPane = (paneItem) => {
    return paneItem instanceof VibloMarkdownPreviewPane
}

const previewPaneFromURI = (uri) => {
    return _find(atom.workspace.getPaneItems(), (pane) => isVibloPreviewPane(pane) && pane.uri === uri)
}

const openMarkdownPreviewForEditor = (editor) => {
    const uri = `${ATOM_PREVIEW_URI}/editor/${editor.id}`
    const existsPreviewPane = previewPaneFromURI(uri)
    const previousActivePane = atom.workspace.getActivePane()
    if (existsPreviewPane) {
        // Toggle exists preview pane:
        atom.workspace.toggle(existsPreviewPane)
        previousActivePane.activate()
    } else {
        atom.workspace.open(uri, { searchAllPanes: true, split: 'right' })
            .then((paneItem) => {
                const pane = atom.workspace.paneForItem(paneItem)
                previousActivePane.activate()
                if (!attachEvent) {
                    attachEvent = true
                    // Unsplit screen when empty:
                    pane.emitter.on('did-remove-item', () => {
                        if (!pane.items.length) {
                            pane.destroy()
                            attachEvent = false
                        }
                    })
                }
            })
    }
}

const toggle = () => {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
        openMarkdownPreviewForEditor(editor)
    }
}

export default toggle
