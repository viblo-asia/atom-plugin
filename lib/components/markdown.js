/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import { createRenderer } from 'viblo-sdk/markdown'

const md = createRenderer()

export default class Markdown {
    constructor ({ contents = '' }) {
        this.contents = contents
        etch.initialize(this)
    }

    render () {
        return (
            <article className="md-contents" innerHTML={md.render(this.contents)}></article>
        )
    }

    update ({ contents = '' }) {
        this.contents = contents
        etch.update(this)
    }
}
