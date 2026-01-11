import { computeShelfSizing } from "../engine/computeShelfSizing";
import { Scale } from "../types";
import { RenderableShelf, RenderableShelfSection } from "../types/engine";
import { computed, ComputedRef } from "vue";

export function useShelfTheme(shelf: RenderableShelf, scale: ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        outer: {
            'background-color': shelf.outerColor
        },
        inner: {
            'background-color': shelf.backgroundColor,
            'top': computeShelfSizing(shelf.topWidth, "height", scale.value),
            'left': computeShelfSizing(shelf.leftWidth, "width", scale.value),
            'height': computeShelfSizing(shelf.innerHeight, "height", scale.value),
            'width': computeShelfSizing(shelf.innerWidth, "width", scale.value)
        }
    }));
}

export function useSectionTheme(section: RenderableShelfSection, scale: ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        section: {
            'height': computeShelfSizing(section.height, "height", scale.value),
            'width': computeShelfSizing(section.width, "width", scale.value)
        },
        bottom: section.bottom === false ? undefined : {
            'background-color': section.bottom.color,
            'height': computeShelfSizing(section.bottom.width, "height", scale.value)
        },
        wall: section.wall === false ? undefined : {
            'background-color': section.wall.color,
            'width': computeShelfSizing(section.wall.width, "width", scale.value)
        }
    }))
}