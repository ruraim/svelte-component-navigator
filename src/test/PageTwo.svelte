<script lang="ts">
    import {link, redirect} from '../action'
</script>

<h1>Page two test</h1>

<a href="page1" use:link>to page 1</a>
<button on:click={() => {redirect('satu')}}>to page 1</button>