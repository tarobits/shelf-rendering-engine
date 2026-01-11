import { Scale, ShelfType } from "../types";
import { RenderableShelf } from "../types/engine";

export function computeShelfSizing(item: number, type: 'width' | 'height', scale: Scale): string {
    switch (type) {
        case 'height':
            return item * scale.h + "px";
        case 'width':
            return item * scale.w + "px";
    }
}

export function computeShelfPercentageSizing(shelf: ShelfType | RenderableShelf, type: 'height' | 'width', percentage: string): number {
    switch (type) {
        case 'height':
            return shelf.innerHeight * (parseInt(percentage.slice(0,-1))/100);
        case 'width':
            return shelf.innerWidth * (parseInt(percentage.slice(0,-1))/100);
    }
}