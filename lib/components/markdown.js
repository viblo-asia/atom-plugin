/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import { createRenderer } from 'viblo-sdk/markdown'
import createImageZoom from '../helpers/zoom'

const md = createRenderer()

export default class Markdown {
    constructor ({ contents = '' }) {
        this.contents = contents
        etch.initialize(this)
        createImageZoom(this)
    }

    render () {
        return (
            <article className="md-contents" innerHTML={md.render(this.contents)}/>
        )
    }

    update ({ contents = '' }) {
        this.contents = contents
        etch.update(this).then(() => createImageZoom(this))
    }
}
