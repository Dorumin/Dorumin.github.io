<script lang="ts">
    import { spring } from 'svelte/motion';

    import { sex } from '$lib/stores/sex';
    import { assert } from 'assertmin';

    const deg = spring(0);

    const promise = new Promise(resolve => {
        resolve("cock");
    });

    type TargetEvent<E extends EventTarget> = Event & { currentTarget: E };

    function onInput(e: TargetEvent<HTMLInputElement>) {
        assert(e.target instanceof HTMLInputElement);

        console.log(e.currentTarget.value);
        console.log(e.target.value);
    }
</script>

<input on:input={(e) => onInput(e)} />