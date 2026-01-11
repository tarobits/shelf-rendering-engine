<template>
    <div class="shelf-container">
        <div v-if="props.shelf.title || props.shelf.subtitle" class="shelf-title-container">
            <p v-if="props.shelf.title" class="shelf-title">{{ props.shelf.title }}</p>
            <p v-if="props.shelf.subtitle" class="shelf-subtitle">{{ props.shelf.subtitle }}</p>
        </div>
        <div class="shelf" ref="el" :style="shelfStyle.outer">
            <div class="shelf-inner" :style="shelfStyle.inner">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getScale } from '../composables';
import { useShelfTheme } from '../composables/useShelfTheme';
import { RenderableShelf } from '../types/engine';
import { onMounted, onUnmounted, ref, toRef } from 'vue';

const el = ref<HTMLElement | null>(null);

const props = defineProps<{
    shelf: RenderableShelf
}>();

let observer: ResizeObserver;

const size = ref({h: 0, w: 0})

const scale = getScale(props.shelf, size);

const shelfStyle = useShelfTheme(props.shelf, scale);

onMounted(() => {
    if (!el.value) return;

    observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        size.value = {w: width, h: height};
    });

    observer.observe(el.value);
})

onUnmounted(() => {
    observer?.disconnect();
})

</script>

<style scoped>
.shelf-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.shelf-title-container {
    height: fit-content;
    width: 100%;
    flex: 0 1;
    display: flex;
    flex-direction: column;
    gap: 2%;
}
.shelf-title {
    font-size: 1.5rem;
    font-weight: 600;
}
.shelf-subtitle {
    font-size: 1.2rem;
    font-weight: 400;
}
.shelf {
    position: relative;
    flex: 1 1;
    width: 100%;
    height: 100%;
}
.shelf-inner {
    position: absolute;
}
</style>