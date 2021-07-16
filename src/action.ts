import {router, instances} from './store'
import {get} from 'svelte/store'

function setActiveRoute(target: string) {
    let failedAttempt: number = 0
    let errResults: any[] = []

    get(instances).forEach(item => {
        try {
            router.setActive(item, target)
            document.dispatchEvent(new CustomEvent('navigator-changed', {detail: item}))
        } catch (e) {
            failedAttempt++
            errResults.push(e)
        }
    })

    if (failedAttempt == get(instances).length) {
        console.log(errResults)
        throw new Error('Route named ' + target + ' is not found dari sini')
    }
}

export function link(node) {

    function handleLinkClicked(ev) {
        ev.preventDefault()
        let target: string = ev.currentTarget.getAttribute('href')
        setActiveRoute(target)
    }

    node.addEventListener('click', handleLinkClicked)

    return {
        destroy() {
            node.removeEventListener('click', handleLinkClicked)
        }
    }
}

export function redirect(target) {
    setActiveRoute(target)
}