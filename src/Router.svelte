<script lang="ts" context="module">
    type routeObject = {
        name: string,
        component: any
        guards?: Function[]
    }

    let routeList: routeObject[]
    let activeRoute: routeObject

    export function redirect(name: String) {
        let route = routeList.find(route => route.name.toLowerCase() == name.toLowerCase())

        if (route == undefined) {
            throw new Error('Route named ' + name + ' is not found.')
        }
        const event = new CustomEvent('route-changed', {detail: route})
        document.dispatchEvent(event)
    }
</script>

<script lang="ts">
    import { onDestroy, onMount } from 'svelte'

    export let routes: routeObject[]
    export let defaultRoute: string = ''
    export let transition: any = false

    let currentRoute: routeObject
    let transitionTrigger: Object = {}

    function initRouter() {

        if (routes.length <= 0 || routes == undefined) {
            throw new Error('Routes object is required')
        }

        routeList = routes

        console.log(routeList)

        activeRoute = routeList[0]
        if (defaultRoute != '' && defaultRoute != undefined) {
            activeRoute = routeList.find(route => route.name.toLowerCase() == defaultRoute.toLowerCase())
        }

        currentRoute = activeRoute
    }

    let eventObj

    onMount(() => {

        eventObj = document.addEventListener('route-changed', (ev: CustomEvent) => {
            currentRoute = ev.detail
            transitionTrigger = {}
        })

        initRouter()
    })

    onDestroy(() => {
        document.removeEventListener('route-changed', eventObj)
    })
</script>

{#if currentRoute}
    {#if transition}
        {#key transitionTrigger}
            <div in:transition>
                <svelte:component this={currentRoute.component}/>
            </div>
        {/key}
    {:else}
        <svelte:component this={currentRoute.component}/>
    {/if}
{/if}