import { computeShelfSizing } from "../engine/computeShelfSizing";
import { Scale } from "../types";
import { RenderableShelf, RenderableShelfItem, RenderableShelfRow, RenderableShelfSection } from "../types/engine";
import { computed, ComputedRef, Ref } from "vue";

export function useShelfTheme(shelf: RenderableShelf, scale: ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        outer: {
            backgroundColor: shelf.outerColor
        },
        inner: {
            backgroundColor: shelf.backgroundColor,
            'top': computeShelfSizing(shelf.topWidth, "height", scale.value),
            'left': computeShelfSizing(shelf.leftWidth, "width", scale.value),
            'height': computeShelfSizing(shelf.innerHeight, "height", scale.value),
            'width': computeShelfSizing(shelf.innerWidth, "width", scale.value)
        }
    }));
}

export function useRowTheme(row: RenderableShelfRow, scale: ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        height: computeShelfSizing(row.height, "height", scale.value)
    }));
}

export function useSectionTheme(section: RenderableShelfSection, scale: Ref<{h:number,w:number}> | ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        section: {
            'height': computeShelfSizing(section.height, "height", scale.value),
            'width': computeShelfSizing(section.width, "width", scale.value)
        },
        sectionContent: {
            'height': computeShelfSizing(section.height-(section.bottom !== false ? section.bottom.width : 0), "height", scale.value),
            'width': computeShelfSizing(section.width-(section.wall !== false ? section.wall.width : 0), "width", scale.value),
            'right': (section.wall !== false && section.wall.position === "left" ? '0px': undefined),
            'left': (section.wall === false || section.wall.position === "right" ? '0px': undefined),
            flexDirection: (section.sortBookInverted === true ? "row-reverse" : "row") as "row-reverse" | "row"
        },
        bottom: section.bottom === false ? undefined : {
            backgroundColor: section.bottom.color,
            'height': computeShelfSizing(section.bottom.width, "height", scale.value)
        },
        wall: section.wall === false ? undefined : {
            backgroundColor: section.wall.color,
            'width': computeShelfSizing(section.wall.width, "width", scale.value)
        }
    }))
}

export function useItemTheme(item: RenderableShelfItem, scale: Ref<{h:number,w:number}> | ComputedRef<{h: number, w: number}>, invertedBooks: boolean) {
    return computed(() =>({
        item: {
            width: computeShelfSizing(item.width, "width", scale.value),
            height: computeShelfSizing(item.height, "height", scale.value),
        },
        colorFrontView: {
            width: computeShelfSizing(item.height, "width", scale.value),
            height: computeShelfSizing(item.width, "height", scale.value),
            transformOrigin: 'left top',
            transform: 'rotate(90deg)' + (invertedBooks === false ? ' translateY(-100%)' : ''),
            backgroundColor: (item.frontView.type === "color" ? item.frontView.color : undefined)
        }
    }))
}