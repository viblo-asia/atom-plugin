/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class Image {
    constructor ({ image }) {
        this.image = image
        etch.initialize(this)
    }

    render () {
        // HTML5 attributes is not supported by etch.
        return (
            <img
                alt={this.image.name}
                src={this.image.thumbnail}
                data-zoom-target={this.image.path}
                title={this.image.name}
            />
        )
    }

    update () {
        etch.update(this)
    }
}
