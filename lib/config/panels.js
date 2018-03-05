/** @babel */
import PostsPanel from '../panels/posts-panel'
import SettingsPanel from '../panels/settings-panel'
import AboutPanel from '../panels/about-panel'
import _assign from 'lodash/assign'

const PANEL_ID_PUBLISH_POSTS = 'publish-posts'
const PANEL_ID_DRAFT_POSTS = 'draft-posts'
const PANEL_ID_SETTINGS = 'settings'
const PANEL_ID_ABOUT = 'about'

export default [
    {
        id: PANEL_ID_PUBLISH_POSTS,
        name: 'Publish Posts',
        iconName: 'icon-pencil',
        auth: true,
        creator: (options) => {
            const { getUserPosts } = require('viblo-sdk/api/users')
            options = _assign(options, {
                fetch: getUserPosts,
                title: 'Publish posts'
            })
            return new PostsPanel(options)
        }
    },
    {
        id: PANEL_ID_DRAFT_POSTS,
        name: 'Drafts',
        iconName: 'icon-lock',
        auth: true,
        creator: (options) => {
            const { getDrafts } = require('viblo-sdk/api/me')
            const fetch = async (_u, params) => await getDrafts(params)
            options = _assign(options, {
                fetch,
                title: 'Drafts'
            })
            return new PostsPanel(options)
        }
    },
    {
        id: PANEL_ID_SETTINGS,
        name: 'Settings',
        iconName: 'icon-settings',
        creator: () => new SettingsPanel()
    },
    {
        id: PANEL_ID_ABOUT,
        name: 'About',
        iconName: 'viblo-logo',
        creator: () => new AboutPanel()
    }
]
