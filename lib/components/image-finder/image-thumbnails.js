/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _map from 'lodash/map'
import { Emitter } from 'atom'

export default class ImageThumbnails {
    constructor ({ images = [], onInsertImage }) {
        this.images = images
        this.emitter = new Emitter()
        this.emitter.on('insert-image', onInsertImage || () => {})
        etch.initialize(this)
    }

    render () {
        return (
            <div className="image-thumbnails">
                {
                    _map(this.images, (image) => (
                        <div className="thumbnail-box mb-1">
                            <a
                                href="javascript:void(0);"
                                className="thumbnail"
                                onClick={() => this.emitter.emit('insert-image', image)}
                                title={image.name}
                            >
                                <img src={image.thumbnail} class="w-100"/>
                            </a>
                        </div>
                    ))
                }
            </div>
        )
    }

    update ({ images = [] }) {
        this.images = images
        etch.update(this)
    }
}
