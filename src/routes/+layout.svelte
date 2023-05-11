<script>
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
        background: #181818;
        color: #eee;
	}

    main {
        height: 100%;
        overflow: auto;
    }
</style>
