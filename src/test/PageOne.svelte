<script lang="ts">
    import {redirect} from '../Router.svelte'
</script>

<h1>Page one test</h1>

<button on:click={() => {redirect('page2')}}>to page 1</button>