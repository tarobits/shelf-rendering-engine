import { EntityLocation } from "./misc"
import { ShelfItem } from "./shelfItem"

export type ShelfSizes = {
    innerHeight: number,
    innerWidth: number,
    topWidth: number,
    bottomWidth: number,
    leftWidth: number,
    rightWidth: number
}

export type ShelfSection = {
    width: number | string, // Number or percent
    height: number | string, // Number or percent
    x?: number, // 0 and up
    y?: number, // 0 and up
    sortBooksInverted?: boolean,
    bottom: {
        width: number,
        color?: string
    }
    wall?: {
        position: 'left' | 'right',
        color?: string,
        width: number
    }
    items: ShelfItem[]
}

export type ShelfType = {
    title?: string,
    subtitle?: string,
    location?: EntityLocation[],
    innerWidth: number,
    innerHeight: number,
    backgroundColor: string,
    outerColor: string,
    model: ShelfSection[];
    topWidth: number,
    bottomWidth: number,
    rightWidth: number,
    leftWidth: number
};