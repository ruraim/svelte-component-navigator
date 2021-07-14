# Svelte Component Navigator
Simple component router for svelte 3, useful for building embedded apps/widget. Change component dynamically based on defined routes without changing/updating the browser's url.

## Installation
````sh
npm install svelte-component-navigator
````

## Usage
```html
<script>
    // App.svelte

    import {fade} from 'svelte/transition'
    import {Router} from 'svelte-component-navigator'
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
### Redirect Page
```html
<script>
    // PageOne.svelte
    import {redirect} from 'svelte-component-navigator'

    function changePage() {
        redirect('page2') // use the route name
    }
</script>

<h1>Page one test</h1>

<button on:click={changePage}>to page 2</button>
```
