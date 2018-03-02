/** @babel */
import { self } from 'viblo-sdk/api/me'
import TokenManager from './token-manager'
import Notification from '../components/notification'
import { Emitter } from 'atom'
import axios from 'viblo-sdk/libs/axios'

const auth = require('viblo-sdk/auth')
const { API_URL, ATOM_APP_URI } = require('../config')

export default class Auth {
    constructor () {
        this.initializedSDK = false
        this.authenticated = false
        this.user = null
        this.tokenManager = new TokenManager()
        this.tokenManager.loadApiToken()
        this.emitter = new Emitter()
        this.initializeSDK()
    }

    setAccessToken (accessToken) {
        accessToken = accessToken ? accessToken : this.tokenManager.getSavedToken()
        auth.setAccessToken({
            token_type: 'Bearer',
            access_token: accessToken
        })
    }

    login (token = '') {
        this.setAccessToken(token)
        return self()
            .then(({ data }) => {
                this.authenticated = data !== null
                this.user = data
                return data
            })
            .catch((e) => {
                this.authenticated = false
                this.user = null
                throw e
            })
    }

    initializeSDK () {
        if (!this.initializedSDK) {
            this.initializedSDK = true
            axios.defaults['baseURL'] = API_URL
            axios.defaults.headers.common['x-http-source'] = 'atom'
            this.setupSDK()
        }
    }

    setupSDK () {
        // eslint-disable-next-line no-def
        this.login()
            .then(() => this.emitter.emit('did-change-auth'))
            .catch((e) => {
                if (e && e.response) {
                    Notification.error(
                        'API token is not set up.',
                        'Please go to "Settings" panel then set up the other API Token.',
                        true,
                        [{
                            text: 'Go to Settings',
                            onDidClick () {
                                atom.workspace.open(`${ATOM_APP_URI}/settings`) // eslint-disable-line no-undef
                                Notification.instance.dismiss()
                            }
                        }]
                    )
                }
            })
    }

    onDidChangeAuth (callback) {
        this.emitter.on('did-change-auth', callback)
    }
}
