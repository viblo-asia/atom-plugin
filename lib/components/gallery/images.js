/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _map from 'lodash/map'
import { deleteImage } from 'viblo-sdk/api/me'

export default class Images {
    constructor ({ images = [], onDeleted = () => {} }) {
        this.images = images
        this.onDeleted = onDeleted
        etch.initialize(this)
    }

    deleteImage (image) {
        const confirm = window.confirm('Delete this image?')
        if (confirm) {
            return deleteImage(image.id)
                .then(() => this.onDeleted(image))
                .catch(() => Notification.error('Failed', 'Can not delete this image. Please try again.'))
        }
    }

    render () {
        return (
            <div className="gallery__images">
                {
                    _map(this.images, (image) => {
                        return image.path ? (
                            <figure class="gallery__image">
                                <img
                                    alt={image.name}
                                    src={image.thumbnail}
                                    title={image.name}
                                />

                                <div class="gallery__image-controls">
                                    <a
                                        class="action mr-05"
                                        href={image.path}
                                        download={image.name}
                                    >
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                    </a>
                                    <a
                                        class="action ml-1"
                                        href="javascript:void(0);"
                                        onClick={() => this.deleteImage(image)}
                                    >
                                        <i aria-hidden="true" class="fa fa-trash"></i>
                                    </a>
                                </div>
                            </figure>
                        ) : (
                            <figure class="gallery__image">
                                <img alt="Image not found" src="http://placehold.it/300x300"/>
                            </figure>
                        )
                    })
                }
            </div>
        )
    }

    update ({ images = [] }) {
        this.images = images
        etch.update(this)
    }
}
