import { Scale } from "../types";
import { ViewableShelf } from "../types/engine";
import { computed, Ref } from "vue";

export function getScale(shelf: Ref<ViewableShelf>, html: Ref<{h: number, w:number}>) {
    let relational: Scale = {
        h: shelf.value.innerHeight+shelf.value.topWidth+shelf.value.bottomWidth,
        w: shelf.value.innerWidth+shelf.value.leftWidth+shelf.value.rightWidth
    }
    return computed(() => ({
        w: html.value.w/relational.w,
        h: html.value.h/relational.h
    }))
}