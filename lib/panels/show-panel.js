/** @babel */
import { REGEX_SYSTEM_PANEL } from '../config'
import { panels } from '../config/panels'
import _find from 'lodash/find'
import _trim from 'lodash/trim'

const normalizeQuery = (queryString = '') => {
    if (!queryString) {
        return ''
    }

    queryString = _trim(queryString, '?')
    const jsonString = decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')

    return JSON.parse(`{"${jsonString}"}`)
}

export default (appInstance, uri) => {
    const match = REGEX_SYSTEM_PANEL.exec(uri)
    const panelId = match ? match[1] : null
    const query = match ? normalizeQuery(match[2]) : null
    const panel = _find(panels, (item) => item.id === panelId)
    if (panel) {
        appInstance.showPanel(panel.id, { uri, query })
    } else {
        console.warn(
            'Panel not found. Please add panel information in ./config/panels.js for this.',
            'Data matched:',
            {id: panelId, param}
        )
    }
}
