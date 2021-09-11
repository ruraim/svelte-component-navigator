<script lang="ts">
    import {fade} from 'svelte/transition'
    import Router from '../Router.svelte'
    import PageOne from './PageOne.svelte'
    import PageTwo from './PageTwo.svelte'

    let routes = [
        {
            name: 'page1',
            component: PageOne,
            params: {
                name: 'Russell Raimundo'
            }
        },
        {
            name: 'page2',
            component: PageTwo,
            guard(current, target) {
                console.log(current, target)
                return true
            }
        }
    ]

    let routes2 = [
        {
            name: 'satu',
            component: PageOne
        },
        {
            name: 'dua',
            component: PageTwo
        }
    ]

    function handleChanged(ev) {
        console.log(ev)
    }
</script>

<h1>Test App</h1>

<div>
    <!-- <PageOne/> -->
    <Router {routes}/>
    <Router on:routeChanged={handleChanged} defaultRoute="dua" transition={fade} routes={routes2}/>
</div>