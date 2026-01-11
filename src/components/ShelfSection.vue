<template>
    <div class="section" :style="sectionStyle.section">
        <div class="section-content" :style="sectionStyle.sectionContent">
            <ShelfObject v-for="so,i in props.section.items" :key="i" :item="so" :scale="scale" :inverted-books="props.section.sortBookInverted" />
        </div>
        <div v-if="props.section.wall !== false" class="section-wall" :style="sectionStyle.wall"></div>
        <div v-if="props.section.bottom !== false" class="section-bottom" :style="sectionStyle.bottom"></div>
    </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useSectionTheme } from '../composables/useShelfTheme';
import { ViewableShelfSection } from '../types/engine';
import ShelfObject from './ShelfObject.vue';

const props = defineProps<{
    section: ViewableShelfSection,
    scale: { h: number; w: number }
}>();

const sectionRef = toRef(props, 'section');

const scale = computed(() => ({
    h: props.scale.h,
    w: props.scale.w
}))

const sectionStyle = useSectionTheme(sectionRef, scale);
</script>

<style scoped>
.section {
    position: relative;
}
.section-content {
    position: absolute;
    display: flex;
    align-items: end;
}
.section-wall {
    position: absolute;
    right: 0px;
    height: 100%;
}
.section-bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
}
</style>