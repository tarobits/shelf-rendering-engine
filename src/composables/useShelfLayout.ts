import { Scale } from "../types";
import { RenderableShelf } from "../types/engine";
import { computed, Ref } from "vue";

export function getScale(shelf: RenderableShelf, html: Ref<{h: number, w:number}>) {
    let relational: Scale = {
        h: shelf.innerHeight+shelf.topWidth+shelf.bottomWidth,
        w: shelf.innerWidth+shelf.leftWidth+shelf.rightWidth
    }
    return computed(() => ({
        w: html.value.w/relational.w,
        h: html.value.h/relational.h
    }))
}