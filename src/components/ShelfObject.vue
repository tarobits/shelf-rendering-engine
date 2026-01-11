<template>
    <div class="item" :style="itemStyle.item">
        <img v-if="props.item.frontView.type === 'image'" :src="props.item.frontView.url" class="item-spine" />
        <div v-else-if="props.item.frontView.type === 'color'" class="item-color-spine" :style="itemStyle.colorFrontView">
            <span v-if="props.item.frontView.exclude?.title ?? false === false" class="item-spine-title">{{ props.item.title }}</span>
            <span v-if="props.item.subtitle && (props.item.frontView.exclude?.subtitle ?? false) === false" class="item-spine-subtitle">{{ props.item.subtitle }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { ViewableShelfItem } from '../types/engine';
import { useItemTheme } from '../composables/useShelfTheme';

const props = defineProps<{
    item: ViewableShelfItem,
    scale: { h: number; w: number },
    invertedBooks: boolean
}>();

const itemRef = toRef(props, 'item');
const invertedBooksRef = toRef(props, 'invertedBooks');

const scale = computed(() => ({
    h: props.scale.h,
    w: props.scale.w
}))

const itemStyle = useItemTheme(itemRef, scale, invertedBooksRef);
</script>

<style scoped>
.item {
    overflow: hidden;
}
.item-extendable {
    transition: margin-bottom 0.4s ease;
    margin-bottom: 0px;
    cursor: pointer;
}
.item-extendable:hover {
    margin-bottom: 20px;
}
.item-spine {
    height: 100%;
    width: 100%;
}
.item-color-spine {
    padding: 2%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
}
.item-spine-title {
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
}
.item-spine-subtitle {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
}
</style>