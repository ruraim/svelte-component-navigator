# Svelte Abstract Router
Simple component router for svelte 3, useful for building embedded apps/widget. Change component dynamically based on defined routes without changing/updating the browser's url.

## Installation
```npm install svelte-abstract-router```

## Usage
```js
<script>
    import {fade} from 'svelte/transition'
    import {Router} from 'svelte-abstract-router'
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
    <Router
        transition={fade}
        routes={routes}
        defaultRoute="page1"
    />
</div>
```