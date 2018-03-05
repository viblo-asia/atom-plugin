/** @babel */
import _map from 'lodash/map'
import _find from 'lodash/find'
import { defaultValue } from '../../config/form'
import axios from 'viblo-sdk/libs/axios'

const normalizePublishForm = (formData) => ({
    categories: formData.categories.data,
    locales: _map(formData.locales, (name, locale_code) => ({
        locale_code,
        name,
    }))
})

export const loadFormData = async () => await axios.get('/publish/post')
    .then((response) => normalizePublishForm(response.data))
    .catch(() => defaultValue)

const getOrCreatePublishModal = async (hashId) => {
    const post = PostManager.posts[hashId]
    const formId = `publish-form--${hashId}`
    const modalId = `modal--${formId}`
    let publishModal = _find(
        atom.workspace.getModalPanels(),
        (modal) => modal.className && modal.className === modalId
    )

    if (!publishModal) {
        const PublishForm = require('./index')
        const initialData = await loadFormData()
        const publishForm = new PublishForm({ initialData, id: formId, post })

        publishModal = atom.workspace.addModalPanel({
            className: modalId,
            item: publishForm,
            visible: false,
        })
    }

    return publishModal
}

export const togglePublishForm = async (editorId) => {
    const publishModal = await getOrCreatePublishModal(editorId)

    if (!publishModal.item.getContents()) {
        return require('../../components/notification').error(
            'The contents is required.',
            'Please write something for contents.'
        )
    }

    publishModal.visible ? publishModal.hide() : publishModal.show()
}
