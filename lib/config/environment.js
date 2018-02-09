'use babel'

export default class Environment {
    constructor () {
        this.env = {
            APP_ENV: 'production',
            ROOT_URL: 'https://viblo.asia',
            API_URL: 'https://api.viblo.asia',
            FB_URL: 'https://www.facebook.com/viblo.asia'
        }
    }

    getEnv () {
        try {
            return require('../../.env.json')
        } catch (e) {
            return this.env
        }
    }
}
