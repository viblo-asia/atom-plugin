/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
import _map from 'lodash/map'
import _flatten from 'lodash/flatten'
import _filter from 'lodash/filter'
import _isArrayLike from 'lodash/isArrayLike'
import _omit from 'lodash/omit'
import _range from 'lodash/range'

export default class Pagination {
    constructor (props = {}) {
        this.initialize (props)
        etch.initialize(this)
    }

    initialize ({ path = '', query = {}, currentPage = 1, lastPage = 1, onEachSide = 3, queryParam = 'page' }) {
        this.path = this.normalizePath(path)
        this.query = query
        this.currentPage = currentPage
        this.lastPage = lastPage
        this.onEachSide = onEachSide
        this.queryParam = queryParam
        this.hasPages = this.lastPage > 1
        this.pages = this.getPages()
    }

    normalizePath (path) {
        if (!path) {
            const app = atom.workspace.getActivePaneItem()
            if (app) {
                return app.uri
            }
        }

        return path
    }

    getPages () {
        let window = this.get(this.onEachSide)
        return _flatten(_filter([
            window['first'],
            _isArrayLike(window['slider']) ? ['...'] : null,
            window['slider'],
            _isArrayLike(window['last']) ? ['...'] : null,
            window['last'],
        ], (item) => item !== null))
    }

    get (onEachSide = 3) {
        if (this.lastPage < (onEachSide * 2) + 6) {
            return this.getSmallSlider()
        }

        return this.getUrlSlider(onEachSide)
    }

    getSmallSlider () {
        return {
            'first': _range(1, this.lastPage + 1),
            'slider': null,
            'last': null,
        }
    }

    getUrlSlider (onEachSide) {
        let window = onEachSide * 2

        if (!this.hasPages) {
            return {'first': null, 'slider': null, 'last': null}
        }

        // If the current page is very close to the beginning of the page range, we will
        // just render the beginning of the page range, followed by the last 2 of the
        // links in this list, since we will not have room to create a full slider.
        if (this.currentPage <= window) {
            return this.getSliderTooCloseToBeginning(window)
        } // eslint-disable-line brace-style

        // If the current page is close to the ending of the page range we will just get
        // this first couple pages, followed by a larger window of these ending pages
        // since we're too close to the end of the list to create a full on slider.
        else if (this.currentPage > (this.lastPage - window)) {
            return this.getSliderTooCloseToEnding(window)
        }

        // If we have enough room on both sides of the current page to build a slider we
        // will surround it with both the beginning and ending caps, with this window
        // of pages in the middle providing a Google style sliding paginator setup.
        return this.getFullSlider(onEachSide)
    }

    getSliderTooCloseToBeginning (window) {
        return {
            'first': range(1, window + 3),
            'slider': null,
            'last': this.getFinish(),
        }
    }

    getSliderTooCloseToEnding (window) {
        return {
            'first': this.getStart(),
            'slider': null,
            'last': range(this.lastPage - (window + 2), this.lastPage + 1),
        }
    }

    getFullSlider (onEachSide) {
        return {
            'first': this.getStart(),
            'slider': this.getAdjacentUrlRange(onEachSide),
            'last': this.getFinish(),
        }
    }

    getAdjacentUrlRange (onEachSide) {
        return _range(this.currentPage - onEachSide, this.currentPage + onEachSide + 1)
    }

    getStart () {
        return [1, 2]
    }

    getFinish () {
        return [this.lastPage - 1, this.lastPage]
    }

    to (page) {
        const path = this.path
        const otherParams = _omit(this.query, [this.queryParam])
        const params = page !== 1 ? {
            ...otherParams,
            [this.queryParam]: page
        } : otherParams
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')

        return atom.workspace.open(queryString ? `${path}?${queryString}` : path)
    }

    render () {
        return this.hasPages ? (
            <ul class="pagination">
                {
                    this.currentPage == 1 ? (
                        <li class="page-item">
                            <a class="disabled">
                                <i aria-hidden="true" class="fa fa-angle-left"/>
                            </a>
                        </li>
                    ) : null
                }
                {
                    this.currentPage != 1 ? (
                        <li class="page-item">
                            <a
                                href="javascript:void(0);"
                                onClick={() => this.to(this.currentPage - 1)}
                                rel="prev"
                            >
                                <i aria-hidden="true" class="fa fa-angle-left"/>
                            </a>
                        </li>
                    ) : null
                }
                {
                    _map(this.pages, (link, index) => link === '...'
                        ? (
                            <li className="page-item">
                                <a href="javascript:void(0);">...</a>
                            </li>
                        )
                        : (
                            <li className="page-item">
                                <a
                                    href="javascript:void(0);"
                                    onClick={() => this.to(link)}
                                    active-class=""
                                    class={ link === this.currentPage ? 'active' : null }
                                >
                                    { link }
                                </a>
                            </li>
                        )
                    )
                }
                {
                    this.currentPage == this.lastPage ? (
                        <li class="page-item">
                            <a class="disabled">
                                <i aria-hidden="true" class="fa fa-angle-right"/>
                            </a>
                        </li>
                    ) : null
                }
                {
                    this.currentPage != this.lastPage ? (
                        <li class="page-item">
                            <a
                                href="javascript:void(0);"
                                onClick={() => this.to(this.currentPage + 1)}
                                rel="next"
                            >
                                <i aria-hidden="true" class="fa fa-angle-right"/>
                            </a>
                        </li>
                    ) : null
                }
            </ul>
        ) : <ul className="pagination"/>
    }

    update (props = {}) {
        this.initialize(props)
        etch.update(this)
    }
}
