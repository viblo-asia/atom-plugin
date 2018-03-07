/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import Dropzone from '../dropzone'
import ImageThumbnails from './image-thumbnails'
import Pagination from '../pagination'
import { Emitter } from 'atom'
import { getImages } from 'viblo-sdk/api/me'

const { API_URL } = require('../../config')

export default class ImageFinder {
    constructor ({ images = [], pagination = null } = {}) {
        this.images = images
        this.pagination = pagination
        this.emitter = new Emitter()
        etch.initialize(this)
    }

    async fetchImages (page = 1) {
        const { data, meta: { pagination } } = await getImages({ limit: 18, page })
        this.images = data
        this.pagination = pagination
        etch.update(this)
    }

    close () {
        atom.workspace.panelForItem(this).hide()
    }

    onInsertImage (callback) {
        this.emitter.on('insert-image', callback)
    }

    onUploadSucceeded ({ file, response, dropzone }) {
        dropzone.removeFile(file)
        this.fetchImages()
    }

    render () {
        return (
            <div className="viblo-image-helper">
                <div className="body">
                    <h1 className="heading-title">Viblo Image Finder</h1>
                    <div className="content">
                        <div className="row form-group space-between mt-1">
                            <Dropzone
                                url={`${API_URL}/uploads`}
                                success={(args) => this.onUploadSucceeded(args)}
                            />
                        </div>
                        <div className="row form-group mt-1">
                            <ImageThumbnails
                                images={this.images}
                                onInsertImage={(image) => this.emitter.emit('insert-image', image)}
                            />
                            {
                                this.pagination ? (
                                    <Pagination
                                        currentPage={this.pagination.current_page}
                                        lastPage={this.pagination.total_pages}
                                        clickItem={ (page) => this.fetchImages(page) }
                                    />
                                ) : null
                            }
                        </div>
                        <div className="form-group space-between mt-1" style="flex-direction: row-reverse">
                            <button
                                className="btn"
                                onClick={() => this.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    update ({ images = [], pagination }) {
        this.images = images
        this.pagination = pagination
        etch.update(this)
    }
}
