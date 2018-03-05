/** @babel */
/** @jsx etch.dom */
import { TextEditorView } from 'atom-space-pen-views' // eslint-disable-line no-unused-vars
import etch from 'etch'
import { go_to } from '../helpers'
import Notification from '../components/notification'

export default class SettingsPanel {
    constructor () {
        this.open = false

        // Init component:
        etch.initialize(this)
        this.initialize()
    }

    initialize () {
        const editor = this.refs.apiToken.getModel()

        // eslint-disable-next-line no-undef
        editor.setPlaceholderText(Auth.tokenManager.makeSecretString())
        editor.onDidStopChanging(() => this.onTextEditorChanged(editor.getText()))
    }

    onTextEditorChanged (token) {
        this.refs.clear.style.display = !token ? 'none' : 'inline-block'

        if (this.timeOut) {
            clearTimeout(this.timeOut)
            this.timeOut = null
        }

        this.timeOut = setTimeout(() => {
            Auth.login(token)
                .then((user) => this.onSuccessLoggedIn({ token, user }))
                .catch((e) => this.onFailLoggedIn(e))
        }, 2000)
    }

    onSuccessLoggedIn ({ token }) {
        Auth.tokenManager.saveApiToken(token)
            .then((token) => Notification.successWithReload(
                token ? 'Viblo API token is updated successfully!' : 'Logout successfully!',
                'You have to reload Atom to apply token changes.'
            ))
            .catch((e) => {
                console.error(e)
                return Notification.error('Viblo API token was not updated due to an error!')
            })
    }

    onFailLoggedIn () {
        return Notification.error(
            'Viblo API Token is invalid.',
            'Please use another API token. You can click on "Show guide" to know how to get an API token.'
        )
    }

    toggleGuide () {
        this.open = !this.open
        // this.update() throws exception because TextViewEditor is not etch component.
        this.element.querySelector('#btn-toggle-guide').innerText = this.open ? 'Hide guide' : 'Show guide'
        this.element.querySelector('#guides').style.display = this.open ? 'block' : 'none'
    }

    clear () {
        const confirm = window.confirm('Are you sure you want to remove API token?')
        if (confirm) {
            const editor = this.refs.apiToken.getModel()
            editor.setPlaceholderText('')
            editor.setText('')
            this.refs.clear.style.display = 'none'
        }
    }

    render () {
        return (
            <section className="section settings-panel">
                <div className="section-container">
                    <div className="block section-heading icon icon-settings">
                        API Token
                    </div>
                    <div className="section-body">
                        <div className="control-group">
                            <div className="controls">
                                <div className="control-label">
                                    <div className="setting-title">
                                        To integrate with Viblo Sharing Platform you must
                                        to create new API token on Viblo Profile Page.
                                    </div>
                                    <div className="setting-description">
                                        Paste your private Viblo API token here...
                                        Then it will be auto save.
                                    </div>
                                </div>
                                <div className="controls">
                                    <div className="editor-container">
                                        <TextEditorView
                                            mini={true}
                                            attributes={{
                                                id: 'viblo-atom-plugin.apiToken',
                                                type: 'string'
                                            }}
                                            ref="apiToken"
                                        />
                                    </div>
                                </div>
                                <div className="space-between">
                                    <a
                                        id="btn-toggle-guide"
                                        className="btn-toggle-guide"
                                        style="margin-top: 0.5rem;display:inline-block;"
                                        ref="toggle-guide"
                                        onClick={() => this.toggleGuide()}
                                    >
                                        {this.open ? 'Hide guide' : 'Show Guide'}
                                    </a>
                                    <a
                                        className="btn-toggle-guide"
                                        style={`margin-top: 0.5rem;display:${Auth.tokenManager.getSavedToken() ? 'inline-block' : 'none'}`}
                                        ref="clear"
                                        onClick={() => this.clear()}
                                    >
                                        Remove API token
                                    </a>
                                </div>
                                <ul
                                    id="guides"
                                    className="guides"
                                    style={`display: ${this.open ? 'block' : 'none'}`}
                                >
                                    <li>
                                        Head to&nbsp;
                                        <a
                                            className="text--primary"
                                            onClick={() => go_to('/settings/oauth')}
                                        >
                                            API keys
                                        </a>
                                        &nbsp;for your Viblo account.
                                    </li>
                                    <li>
                                        Click <span className="text--primary">New API key</span>
                                        &nbsp;button on the&nbsp;
                                        <span className="text--primary">API keys</span>
                                        &nbsp;panel, and specify a name for your API key.
                                    </li>
                                    <li>
                                        Copy the generated API key and paste it in the below form.
                                        Note that this key is only visible once.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    update () {
        etch.update(this)
    }
}
