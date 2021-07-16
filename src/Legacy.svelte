<script lang="ts" context="module">
    type routeObject = {
        name: string,
        component: any
        guards?: Function[]
    }

    export function redirect(name: String) {
        const event = new CustomEvent('route-changed', {detail: name})
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

        if (defaultRoute != '' && defaultRoute != undefined) {
            currentRoute = routes.find(route => route.name.toLowerCase() == defaultRoute.toLowerCase())
        }
    }

    let eventObj

    onMount(() => {
        initRouter()

        eventObj = document.addEventListener('route-changed', (ev: CustomEvent) => {
            let route = routes.find(route => route.name.toLowerCase() == ev.detail.name.toLowerCase())

            if (route == undefined) {
                throw new Error('Route named ' + ev.detail.name + ' is not found.')
            }
            currentRoute = route
            transitionTrigger = {}
        })
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