<script lang="ts">
    import {redirect} from '../router'
</script>

<h1>Page two test</h1>

<button on:click={() => {redirect('page1')}}>to page 1</button>