import {router, instances} from './store'

let instanceList = []
instances.subscribe(value => {
    instanceList = value
})

function setActiveRoute(target: string) {
    let failedAttempt: number = 0
    let errResults: any[] = []

    instanceList.forEach(item => {
        try {
            router.setActive(item, target)
            document.dispatchEvent(new CustomEvent('navigator-changed', {detail: item}))
        } catch (e) {
            failedAttempt++
            errResults.push(e)
        }
    })

    if (failedAttempt == instanceList.length) {
        throw new Error('Route named ' + target + ' is not found')
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