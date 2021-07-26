<script lang="ts">
    import { onDestroy, onMount } from 'svelte'
    import type { routeObject } from './router'
    import {router, instances} from './store'
    import {createEventDispatcher} from 'svelte'

    export let routes: routeObject[]
    export let defaultRoute: string
    export let transition: any = false
    let transitionTrigger: object = {}

    let activeRoute: routeObject
    let rand: string
    let dispatch = createEventDispatcher()

    function pageChanged(ev) {
        if (ev.detail === rand) {
            activeRoute = router.getActive(ev.detail)
            transitionTrigger = {}
            dispatch('routeChanged', {id: ev.detail, route: activeRoute})
        }
    }

    onMount(() => {
        rand = Math.random().toString()

        router.addInstance(rand, routes)

        router.setActive(rand, $router[rand][0].name)
        if (defaultRoute) {
            router.setActive(rand, defaultRoute)
        }

        activeRoute = router.getActive(rand)
        document.addEventListener('navigator-changed', pageChanged)
    })

    onDestroy(() => {
        document.removeEventListener('navigator-changed', pageChanged)
    })

</script>

{#if activeRoute}
    {#if transition}
        {#key transitionTrigger}
            <div in:transition>
                <svelte:component routeData={activeRoute.params} this={activeRoute.component}/>
            </div>
        {/key}
    {:else}
        <svelte:component routeData={activeRoute.params} this={activeRoute.component}/>
    {/if}
{/if}