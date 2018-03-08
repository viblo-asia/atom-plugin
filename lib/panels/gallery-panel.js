/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import { Emitter } from 'atom'
import Dropzone from '../components/dropzone'
import Images from '../components/gallery/images'
import Pagination from '../components/pagination'
import { getImages } from 'viblo-sdk/api/me'
import _filter from 'lodash/filter'
import createImageZoom from '../helpers/zoom'

const { API_URL } = require('../config')

export default class GalleryPanel {
    constructor ({ images = [], pagination = null } = {}) {
        this.images = images
        this.pagination = pagination
        this.emitter = new Emitter()
        etch.initialize(this)
    }

    async fetchImages (page = 1) {
        const { data, meta: { pagination } } = await getImages({ limit: 16, page })
        this.update({ images: data, pagination })
    }

    close () {
        atom.workspace.panelForItem(this).hide()
    }

    onDeleted (image) {
        this.images = _filter(this.images, (item) => item.id !== image.id)
        if (this.images.length === 0) {
            const currentPage = this.pagination.current_page
            const page = currentPage > 1 ? currentPage - 1 : 1
            this.fetchImages(page)
        } else {
            this.update(this)
        }
    }

    onUploadSucceeded ({ file, dropzone }) {
        dropzone.removeFile(file)
        this.fetchImages()
    }

    render () {
        return (
            <section className="section gallery-panel">
                <div className="section-container">
                    <div className="block section-heading icon icon-settings">
                        Gallery panel
                    </div>
                    <div className="section-body">
                        <div className="gallery mt-1">
                            <Images
                                images={this.images}
                                onDeleted={(image) => this.onDeleted(image)}
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
                        <div className="row form-group space-between mt-1">
                            <Dropzone
                                url={`${API_URL}/uploads`}
                                success={(args) => this.onUploadSucceeded(args)}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    update ({ images = [], pagination }) {
        this.images = images
        this.pagination = pagination
        etch.update(this).then(() => createImageZoom(this))
    }
}
