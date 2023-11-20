<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let itemCount: number;
    export let component: ConstructorOfATypedSvelteComponent;

    const dispatch = createEventDispatcher<{ scroll: UIEvent }>();

    function localOnScroll(e: UIEvent) {
        console.log(e);
        dispatch('scroll', e);
    }
</script>

<ul class='virtualized-list' on:scroll={localOnScroll} on:wheel>
    <div class='virtual-padding top-padding' />
    {#each { length: itemCount } as _, index}
        <svelte:component this={component} index={index} />
    {/each}
    <div class='virtual-padding bottom-padding' />
</ul>