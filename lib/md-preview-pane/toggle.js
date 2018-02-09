/** @babel */
import VibloMarkdownPreviewPane from './index'
import _find from 'lodash/find'
import { ATOM_PREVIEW_URI } from '../config'

const isVibloPreviewPane = (panel) => {
    return panel instanceof VibloMarkdownPreviewPane
}

const previewPaneFromURI = (uri) => {
    return _find(atom.workspace.getPaneItems(), (pane) => isVibloPreviewPane(pane) && pane.uri === uri)
}

const openMarkdownPreviewForEditor = (editor) => {
    const uri = `${ATOM_PREVIEW_URI}/editor/${editor.id}`
    const existsPreviewPanel = previewPaneFromURI(uri)
    const previousActivePane = atom.workspace.getActivePane()
    if (existsPreviewPanel) {
        // Toggle exists preview panel:
        atom.workspace.toggle(existsPreviewPanel)
        previousActivePane.activate()
    } else {
        atom.workspace.open(uri, { searchAllPanes: true,  split: 'right' })
            .then(() => previousActivePane.activate())
    }
}

const toggle = () => {
    if (isVibloPreviewPane(atom.workspace.getActivePaneItem())) {
        return atom.workspace.destroyActivePaneItem()
    }

    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
        return openMarkdownPreviewForEditor(editor)
    }
}

export default toggle
