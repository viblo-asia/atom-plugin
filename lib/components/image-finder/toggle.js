/** @babel */
import _find from 'lodash/find'
import ImageFinder from './index'

export default async () => {
    const existsModal = _find(atom.workspace.getModalPanels(), (e) => e.item instanceof ImageFinder)
    const editor = atom.workspace.getActiveTextEditor()

    if (!existsModal) {
        const modal = new ImageFinder()
        modal.fetchImages()
        modal.onInsertImage((image) => {
            modal.close()
            editor.insertText(`![Alt](${image.path})`)
        })

        return atom.workspace.addModalPanel({
            className: 'viblo-image-helper-modal',
            item: modal,
        })
    }

    existsModal.item.fetchImages()

    return existsModal.visible ? existsModal.hide() : existsModal.show()
}
