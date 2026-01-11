import { computeShelfSizing } from "../engine/computeShelfSizing";
import { ViewableShelf, ViewableShelfItem, ViewableShelfRow, ViewableShelfSection } from "../types/engine";
import { computed, ComputedRef, Ref } from "vue";

export function useShelfTheme(shelf: Ref<ViewableShelf>, scale: ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        outer: {
            backgroundColor: shelf.value.outerColor
        },
        inner: {
            backgroundColor: shelf.value.backgroundColor,
            'top': computeShelfSizing(shelf.value.topWidth, "height", scale.value),
            'left': computeShelfSizing(shelf.value.leftWidth, "width", scale.value),
            'height': computeShelfSizing(shelf.value.innerHeight, "height", scale.value),
            'width': computeShelfSizing(shelf.value.innerWidth, "width", scale.value)
        }
    }));
}

export function useRowTheme(row: Ref<ViewableShelfRow>, scale: ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        height: computeShelfSizing(row.value.height, "height", scale.value)
    }));
}

export function useSectionTheme(section: Ref<ViewableShelfSection>, scale: Ref<{h:number,w:number}> | ComputedRef<{h: number, w: number}>) {
    return computed(() => ({
        section: {
            'height': computeShelfSizing(section.value.height, "height", scale.value),
            'width': computeShelfSizing(section.value.width, "width", scale.value)
        },
        sectionContent: {
            'height': computeShelfSizing(section.value.height-(section.value.bottom !== false ? section.value.bottom.width : 0), "height", scale.value),
            'width': computeShelfSizing(section.value.width-(section.value.wall !== false ? section.value.wall.width : 0), "width", scale.value),
            'right': (section.value.wall !== false && section.value.wall.position === "left" ? '0px': undefined),
            'left': (section.value.wall === false || section.value.wall.position === "right" ? '0px': undefined),
            flexDirection: (section.value.sortBookInverted === true ? "row-reverse" : "row") as "row-reverse" | "row"
        },
        bottom: section.value.bottom === false ? undefined : {
            backgroundColor: section.value.bottom.color,
            'height': computeShelfSizing(section.value.bottom.width, "height", scale.value)
        },
        wall: section.value.wall === false ? undefined : {
            backgroundColor: section.value.wall.color,
            'width': computeShelfSizing(section.value.wall.width, "width", scale.value)
        }
    }))
}

export function useItemTheme(item: Ref<ViewableShelfItem>, scale: Ref<{h:number,w:number}> | ComputedRef<{h: number, w: number}>, invertedBooks: Ref<boolean>) {
    return computed(() =>({
        item: {
            width: computeShelfSizing(item.value.width, "width", scale.value),
            height: computeShelfSizing(item.value.height, "height", scale.value),
        },
        colorFrontView: {
            width: computeShelfSizing(item.value.height, "height", scale.value),
            height: computeShelfSizing(item.value.width, "width", scale.value),
            transformOrigin: 'left top',
            transform: 'rotate(90deg)' + (invertedBooks.value === false ? ' translateY(-100%)' : ''),
            backgroundColor: (item.value.frontView.type === "color" ? item.value.frontView.color : undefined)
        }
    }))
}