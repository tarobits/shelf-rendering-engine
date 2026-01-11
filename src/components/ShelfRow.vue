<template>
    <div class="shelf-row" :style="rowStyle">
        <ShelfSection v-for="sec, i in props.row.sections" :key="i" :section="sec" :scale="scale" />
    </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, toRef } from 'vue';
import { RenderableShelfRow } from '../types/engine';
import ShelfSection from './ShelfSection.vue';
import { useRowTheme } from '../composables/useShelfTheme';

const props = defineProps<{
    row: RenderableShelfRow,
    scale: { h: number; w: number }
}>();

const scale = computed(() => ({
    h: props.scale.h,
    w: props.scale.w
}))

const rowStyle = useRowTheme(props.row, scale);
</script>

<style scoped>
.shelf-row {
    width: 100%;
    display: flex;
}
</style>