/** @babel */
/** @jsx etch.dom */
import etch from 'etch'
const { ROOT_URL, FB_URL } = require('../config')

export default class AboutPanel {
    constructor () {
        etch.initialize(this)
    }

    render () {
        return (
            <div className="section about-panel">
                <div className="section-container">
                    <section className="section-body">
                        <div className="section-container text-center">
                            <h1 className="section-heading" title="Feel the Power">
                                <p>
                                    <span className="icon viblo-logo"></span>
                                </p>
                                Viblo
                            </h1>
                        </div>
                        <div className="section-container text-center">
                            <h2>
                                <span className="icon viblo-quote-left"></span>
                                Free service for technical knowledge sharing&nbsp;
                                <span className="icon viblo-quote-right"></span>
                            </h2>
                        </div>
                        <div className="about-footer">
                            <div className="about-links text-center">
                                <h3>
                                    <span className="icon viblo-facebook-official"></span>
                                    <a href={FB_URL}>
                                        Facebook Fanpage
                                    </a>
                                </h3>
                                <h3>
                                    <span className="icon icon-home"></span>
                                    Homepage:&nbsp;
                                    <a href={ROOT_URL}>
                                        {ROOT_URL}
                                    </a>
                                </h3>
                                <h3>
                                    Atom Plugin&nbsp;
                                    <span className="icon icon-code"></span>
                                    &nbsp;with&nbsp;
                                    <span className="icon icon-heart"></span>
                                    &nbsp;by&nbsp;
                                    <a href={ROOT_URL}>
                                        Viblo Team
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </section>
                    <section className="section-body">&nbsp;</section>
                </div>
            </div>
        )
    }

    update () {
        etch.update(this)
    }
}
