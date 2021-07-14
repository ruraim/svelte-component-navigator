<script lang="ts">
    import {fade} from 'svelte/transition'
    import Router from '../Router.svelte';
    import PageOne from './PageOne.svelte';
    import PageTwo from './PageTwo.svelte';

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
</script>

<h1>Test App</h1>

<div>
    <Router transition={fade} routes={routes}/>
</div>