/** @babel */
export default {
    instance: null,

    success (message, description = '', dismissable = true, buttons = []) {
        return this.show('addSuccess', message, description, dismissable, false, buttons)
    },

    warning (message, description = '', dismissable = true, buttons = []) {
        return this.show('addWarning', message, description, dismissable, false, buttons)
    },

    successWithReload (message, description = '', dismissable = true, buttons = []) {
        return this.show('addSuccess', message, description, dismissable, true, buttons)
    },

    error (message, description = '', dismissable = true, buttons = []) {
        return this.show('addError', message, description, dismissable, false, buttons)
    },

    errorWithReload (message, description = '', dismissable = true, buttons = []) {
        return this.show('addError', message, description, dismissable, true, buttons)
    },

    show (
        type = 'addSuccess',
        message,
        description = '',
        dismissable = true,
        withReload = false,
        buttons = []
    ) {
        const reloadButton = {
            text: 'Reload Atom',
            onDidClick: () => atom.reload() // eslint-disable-line no-undef
        }
        const cancelButton = {
            text: 'Close',
            onDidClick: () => this.instance.dismiss()
        }
        const internalButtons = withReload ? [reloadButton, cancelButton] : [cancelButton]

        // eslint-disable-next-line no-undef
        this.instance = atom.notifications[type](message, {
            description,
            dismissable,
            buttons: [...buttons, ...internalButtons]
        })
    }
}
