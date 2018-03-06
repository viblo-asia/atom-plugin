'use babel'

import Environment from './environment'

const env = (new Environment()).getEnv()

const isDev = (env.APP_ENV || 'production') !== 'production'
const ROOT_URL = env.ROOT_URL || 'https://viblo.asia'
const FB_URL = env.FB_URL || 'https://www.facebook.com/viblo.asia'
const API_URL = env.API_URL || 'https://api.viblo.asia'

export default {
    isDev,
    ROOT_URL,
    FB_URL,
    API_URL,
    ATOM_APP_URI: 'viblo://app',
    ATOM_PREVIEW_URI: 'viblo-preview://md',
    REGEX_SYSTEM_PANEL: /app\/([a-zA-Z0-9_-]+)(\?\S+)?$/i,
    REGEX_POST_EDITOR: /\.viblo(?:\/|\\)p(?:\/|\\)(?:tmp(?:\/|\\))?([a-zA-Z0-9]+)\.md$/,
}
