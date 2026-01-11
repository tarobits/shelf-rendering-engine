<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { RenderableShelfRow } from '../types/engine';

const props = defineProps<{
    row: RenderableShelfRow,
    scale: {h: number, w: number}
}>();
</script>

<style scoped>

</style>