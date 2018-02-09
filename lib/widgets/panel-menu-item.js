/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class PanelMenuItem {
    constructor ({id, name, iconName}) {
        this.name = name
        this.id = id || name.toLowerCase().replace(/\s+/g, '-')
        this.iconName = iconName

        etch.initialize(this)
        this.element.setAttribute('data-id', this.id)
    }

    render () {
        return (
            <li>
                <a className={`icon ${this.iconName}`}>
                    {this.name}
                </a>
            </li>
        )
    }

    update () {
        //
    }
}
