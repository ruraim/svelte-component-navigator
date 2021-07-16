<script lang="ts">
    import {link, redirect} from '../action'
</script>

<h1>Page one test</h1>

<a href="page2" use:link>to page 2</a>
<button on:click={() => {redirect('dua')}}>to page 2</button>