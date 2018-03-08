/** @babel */
import mediumZoom from '../library/medium-zoom'

export default (component) => {
    if (component.$_zoom) {
        component.$_zoom.detach()
    }

    component.$_zoom = mediumZoom(component.element.querySelectorAll('img:not(.emoji)'), {
        margin: 20,
    })
}
