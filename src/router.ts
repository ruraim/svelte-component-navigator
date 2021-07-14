import { writable, Writable, get } from "svelte/store"

export interface routeObject {
    name: string,
    component: any
    guards?: Function[]
}

export let routeList: Writable<routeObject[]> = writable()
export let activeRoute: Writable<routeObject> = writable()
export let transitionTrigger: Writable<Object> = writable()

export function redirect(name: String) {
    let route = get(routeList).find(route => route.name.toLowerCase() == name.toLowerCase())

    if (route == undefined) {
        throw new Error('Route named ' + name + ' is not found.')
    }
    activeRoute.set(route)
    transitionTrigger.set({})
}