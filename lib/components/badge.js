/** @babel */
/** @jsx etch.dom */
import etch from 'etch'

export default class Badge {
    constructor ({ count }) {
        this.count = count
        etch.initialize(this)
    }

    render () {
        return (
            <span
                ref="badge"
                className="section-heading-count badge badge-flexible"
            >
                {this.count ? this.count : '...'}
            </span>
        )
    }

    update () {
        //
    }
}
