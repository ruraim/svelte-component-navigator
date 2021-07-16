import { writable, derived } from "svelte/store"
import type { routeObject } from "./router"

export const instances = writable([])

export const router = (() => {
    const {subscribe, set, update} = writable({})

    let routes: Object

    subscribe(value => routes = value)

    function addInstance(uniqueId: string, routes: routeObject[]) {
        instances.update(value => [...value, uniqueId])

        update(value => {
            value[uniqueId] = routes
            return value
        })
    }

    function setActive(uniqueId: string, route: string) {
        let specific = routes[uniqueId]
        let result = specific.find(item => item.name.toLowerCase() == route.toLowerCase())
        if (!result) throw new Error('Route named ' + route + ' is not found')

        let updatedRoutes = specific.map(item => {
            item.active = false
            if (item.name.toLowerCase() == route.toLowerCase()) {
                item.active = true
            }
            return item
        })

        update(value => {
            value[uniqueId] = updatedRoutes
            return value
        })
    }

    function getActive(uniqueId: string) {
        return routes[uniqueId].find(item => item.active === true)
    }

    return {
        subscribe,
        set,
        update,
        addInstance,
        setActive,
        getActive
    }
})()