/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import { Emitter } from 'atom'
import Dropzone from 'dropzone'

export default class VibloDropzone {
    constructor (props) {
        this.emitter = new Emitter()
        etch.initialize(this)
        this.initialize(props)
    }

    initialize ({
        url,
        clickable = true,
        acceptedFiles = '',
        thumbnailHeight = 200,
        thumbnailWidth = 200,
        showRemoveLink = true,
        maxFilesize = 2,
        maxFiles = 5,
        autoProcessQueue = true,
        success,
        error,
        onAddedFile,
        onRemovedFile
    }) {
        this.emitter.on('success', success || () => {})
        this.emitter.on('error', error || () => {})
        this.emitter.on('addedfile', onAddedFile || () => {})
        this.emitter.on('removedfile', onRemovedFile || () => {})

        Dropzone.autoDiscover = false

        this.dropzone = new Dropzone(this.element, {
            url: url,
            clickable: clickable,
            thumbnailWidth: thumbnailWidth,
            thumbnailHeight: thumbnailHeight,
            maxFiles: maxFiles,
            maxFilesize: maxFilesize,
            dictRemoveFile: 'Remove',
            addRemoveLinks: showRemoveLink,
            acceptedFiles: acceptedFiles,
            autoProcessQueue:autoProcessQueue,
            dictDefaultMessage: '<i class="fa fa-cloud-upload fa-3x" aria-hidden="true"></i><br>Drag and drop files here or click to upload',
            previewTemplate:
                `<div class="dz-preview dz-file-preview">
                            <div class="dz__image">
                                <img data-dz-thumbnail alt="" >
                                <div class="dz__upload-status">
                                    <div class="dz__upload-status__success"><i class="fa fa-check"></i></div>
                                    <div class="dz__upload-status__error"><i class="fa fa-times"></i></div>
                                </div>
                            </div>
                            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                            <div class="dz-details">
                                <div class="dz-filename"><span data-dz-name></span></div>
                                <div class="dz-size" data-dz-size></div>
                            </div>
                        </div>`,
            headers: {
                'Authorization': `Bearer ${Auth.tokenManager.getSavedToken()}`
            }
        })

        // Handle the dropzone events
        this.dropzone.on('addedfile', (file) => {
            this.emitter.emit('addedfile', { file, dropzone: this.dropzone })
        })

        this.dropzone.on('removedfile', (file) => {
            this.emitter.emit('removedfile', { file, dropzone: this.dropzone })
        })

        this.dropzone.on('success', (file, response) => {
            this.emitter.emit('success', { file, response, dropzone: this.dropzone })
        })

        this.dropzone.on('error', (file, error, xhr) => {
            this.emitter.emit('error', { file, error, xhr, dropzone: this.dropzone })
        })
    }

    render () {
        return (
            <div className="dropzone viblo-dropzone" id="dropzone"></div>
        )
    }

    update () {
        etch.update(this)
    }
}
