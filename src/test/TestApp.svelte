<script lang="ts">
    import {fade} from 'svelte/transition'
    import Router from '../Router.svelte'
    import PageOne from './PageOne.svelte'
    import PageTwo from './PageTwo.svelte'

    let routes = [
        {
            name: 'page1',
            component: PageOne
        },
        {
            name: 'page2',
            component: PageTwo
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
</script>

<h1>Test App</h1>

<div>
    <!-- <PageOne/> -->
    <Router {routes}/>
    <Router defaultRoute="dua" transition={fade} routes={routes2}/>
</div>