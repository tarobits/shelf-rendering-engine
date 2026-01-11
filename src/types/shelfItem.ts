import { IdentificationCode, EntityLocation } from "./misc"
import { FrontShelfView, SideShelfView } from "./shelfView"

type BaseShelfItem = {
    expandable: boolean,
    width: number,
    height: number,
    frontView: FrontShelfView,
    title: string,
    subtitle?: string,
    description?: string,
    positionInRow?: number,
    identification_code?: IdentificationCode[],
    location?: EntityLocation[],
    availibility: 'unlimited' | 'limited',
}

export type LimitedShelfItem = BaseShelfItem & {
    availibility: 'limited',
    count: number
}

export type UnlimitedShelfItem = BaseShelfItem & {
    availibility: 'unlimited'
}

export type ExpandableShelfItem = (UnlimitedShelfItem | LimitedShelfItem) & {
    expandable: true,
    depth: number,
    sideView: SideShelfView
}

export type NonExpandableShelfItem = (UnlimitedShelfItem | LimitedShelfItem) & {
    expandable: false,
}

export type ShelfItem = ExpandableShelfItem | NonExpandableShelfItem;

