/** @babel */
import {self} from 'viblo-sdk/api/me'
import TokenManager from './token-manager'

const auth = require('viblo-sdk/auth')
const tokenManager = new TokenManager()
tokenManager.loadApiToken()

export default {
    authenticated: false,
    user: null,
    tokenManager,

    setAccessToken () {
        auth.setAccessToken({
            token_type: 'Bearer',
            access_token: tokenManager.getSavedToken()
        })
    },

    login () {
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
}
