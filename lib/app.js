/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _each from 'lodash/each'
import _assign from 'lodash/assign'
import { go_to } from './helpers'
import PanelMenuItem from './widgets/panel-menu-item'
import { panels } from './config/panels'

export default class App {
    constructor ({uri, activePanel}) {
        this.uri = uri
        this.deferredPanel = activePanel

        etch.initialize(this)
        process.nextTick(() => this.initializePanels())
    }

    render () {
        return (
            <div className="viblo-atom-plugin settings-view pane-item" tabIndex="-1">
                <div className="config-menu" ref="sidebar">
                    <ul className="panels-menu nav nav-pills nav-stacked" ref="panelMenu">
                        <div className="panel-menu-separator" ref="menuSeparator"></div>
                    </ul>
                    <div className="button-area">
                        <button
                            className="btn btn-default icon icon-link-external"
                            onClick={() => go_to('/')}
                        >
                            Go to Viblo
                        </button>
                    </div>
                </div>

                <div className="panels" tabIndex="-1" ref="panels"></div>
            </div>
        )
    }

    update () {
        etch.update(this)
    }

    initializePanels () {
        this.panelsById = {}
        if (!this.clickHandler) {
            this.clickHandler = (e) => {
                let target = e.target.closest('.panels-menu li, .panels-packages li')
                if (target) {
                    this.uri = `viblo://app/${target.dataset.id}`
                    this.showPanel(target.dataset.id)
                }
            }
            this.element.querySelector('.panels-menu').addEventListener('click', this.clickHandler)
        }

        // Add panel into view:
        _each(panels, (panelItem) => this.addCorePanel(panelItem))
    }

    addCorePanel (panel) {
        // Verify authentication:
        if (panel.auth && !Auth.authenticated) {
            return
        }

        this.createMenuItem(panel)
        this.addPanel(panel.id, panel.creator)
    }

    createMenuItem (panel) {
        if (panel.hidden_in_menu) {
            return
        }

        const panelMenuItem = new PanelMenuItem(panel)
        const existsMenuItem = this.refs.sidebar.querySelector(`[data-id="${panel.id}"`)
        if (existsMenuItem) {
            existsMenuItem.parentNode.removeChild(existsMenuItem)
            panelMenuItem.element = existsMenuItem
        }

        // Add menu item:
        this.refs.menuSeparator.parentElement.insertBefore(
            panelMenuItem.element,
            this.refs.menuSeparator
        )
    }

    addPanel (id, creator) {
        if (!this.panelCreators) {
            this.panelCreators = {}
        }

        this.panelCreators = _assign({}, this.panelCreators, {[id]: creator})

        const deferredPanelId = this.deferredPanel ? this.deferredPanel.id : null
        if (id === deferredPanelId) {
            return this.showDeferredPanel()
        }
    }

    showDeferredPanel () {
        if (this.deferredPanel) {
            const {id, options} = this.deferredPanel
            return this.showPanel(id, options)
        }
    }

    showPanel (id, options = {}) {
        let panel = this.getOrCreatePanel(id, options)

        if (panel) {
            this.appendPanel(panel)
            if (!panel.hidden_in_menu) {
                this.makePanelMenuActive(id)
                this.setActivePanel(id, options)
            }

            return this.deferredPanel = null
        }

        return this.deferredPanel = {id, options}
    }

    getOrCreatePanel (id, options) {
        let panel = this.panelsById ? this.panelsById[id] : null
        if (!panel) {
            // Create a new panel:
            let callback = this.panelCreators ? this.panelCreators[id] : null
            if (callback) {
                panel = callback(options)
                this.addPanelsById(id, panel)
            }
        } else if (panel.onBeforeReactive) {
            panel.onBeforeReactive(options)
        }

        return panel
    }

    appendPanel (panel) {
        _each(this.refs.panels.children, (child) => {
            child.style.display = 'none'
        })

        if (!this.refs.panels.contains(panel.element)) {
            this.refs.panels.appendChild(panel.element)
        }

        panel.element.style.display = 'block'
    }

    makePanelMenuActive (id) {
        const previouslyActivePanel = this.refs.sidebar.querySelector('.active')
        if (previouslyActivePanel) {
            previouslyActivePanel.classList.remove('active')
        }

        const newActivePanel = this.refs.sidebar.querySelector(`[data-id="${id}"`)
        if (newActivePanel) {
            newActivePanel.classList.add('active')
        }
    }

    setActivePanel (id, options) {
        this.activePanel = {id, options}
    }

    addPanelsById (id, panel) {
        if (!this.panelsById) {
            this.panelsById = {}
        }

        this.panelsById = _assign({}, this.panelsById, {[id]: panel})
    }

    getTitle () {
        return 'Viblo'
    }

    getIconName () {
        return 'viblo-logo'
    }

    serialize () {
        return {
            deserializer: 'App',
            uri: this.uri,
            activePanel: this.activePanel,
        }
    }
}
