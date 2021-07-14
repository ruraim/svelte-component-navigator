<script lang="ts">
    import { onMount } from 'svelte'
    import { transitionTrigger, routeList, activeRoute } from './router'

    type routeObject = {
        name: string,
        component: any
        guards?: Function[]
    }

    export let routes: routeObject[]
    export let defaultRoute: string = ''
    export let transition: any = false

    function initRouter() {

        if (routes.length <= 0 || routes == undefined) {
            throw new Error('Routes object is required')
        }

        $routeList = routes

        $activeRoute = $routeList[0]
        if (defaultRoute != '' && defaultRoute != undefined) {
            $activeRoute = $routeList.find(route => route.name.toLowerCase() == defaultRoute.toLowerCase())
        }
    }

    onMount(() => {
        initRouter()
    })
</script>

{#if $activeRoute}
    {#if transition != undefined}
        {#key $transitionTrigger}
            <div in:transition>
                <svelte:component this={$activeRoute.component}/>
            </div>
        {/key}
    {:else}
        <svelte:component this={$activeRoute.component}/>
    {/if}
{/if}