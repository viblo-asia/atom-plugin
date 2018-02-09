/** @babel */
/** @jsx etch.dom */
import { CompositeDisposable } from 'atom'
import { TextEditorView } from 'atom-space-pen-views' // eslint-disable-line no-unused-vars
import etch from 'etch'
import { go_to } from '../helpers'
import Notification from '../widgets/notification'

export default class SettingsPanel {
    constructor () {
        this.open = false
        this.disposables = new CompositeDisposable()

        // Init component:
        etch.initialize(this)
        this.initialize()
    }

    initialize () {
        const editor = this.refs.apiToken.getModel()

        // eslint-disable-next-line no-undef
        editor.setPlaceholderText(Auth.tokenManager.makeSecretString())
        this.disposables.add(editor.onDidStopChanging(() => this.onTextEditorChanged(editor.getText())))
    }

    onTextEditorChanged (text) {
        if (this.timeOut) {
            clearTimeout(this.timeOut)
        }

        this.timeOut = setTimeout(() => {
            // eslint-disable-next-line no-undef
            Auth.tokenManager.saveApiToken(text)
                .then((token) => Notification.successWithReload(
                    'Viblo API token updated successfully!',
                    'You have to reload Atom to apply token changes'
                ))
                .catch((e) => {
                    console.error(e)
                    return Notification.error('Viblo API token  was not updated due to an error!')
                })
        }, 2000)
    }

    toggleGuide () {
        this.open = !this.open
        // etch.update(this) Throw exception?
        this.element.querySelector('#btn-toggle-guide').innerText = this.open ? 'Hide guide' : 'Show guide'
        this.element.querySelector('#guides').style.display = this.open ? 'block' : 'none'
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
                                <a
                                    id="btn-toggle-guide"
                                    className="btn-toggle-guide"
                                    ref="toggle-guide"
                                    onClick={() => this.toggleGuide()}
                                >
                                    {this.open ? 'Hide guide' : 'Show Guide'}
                                </a>
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
