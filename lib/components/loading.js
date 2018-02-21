/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class Loading {
    constructor ({ text }) {
        this.text = text
        etch.initialize(this)
    }

    render () {
        return (
            <span
                ref="loading"
                className="alert alert-info loading-area icon icon-hourglass"
            >
                {this.text ? this.text : 'Post loading...'}
            </span>
        )
    }

    update () {
        //
    }
}
