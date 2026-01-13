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
    identificationCode?: IdentificationCode[],
    location?: EntityLocation[],
    availability: 'unlimited' | 'limited',
}

export type LimitedShelfItem = BaseShelfItem & {
    availability: 'limited',
    count: number
}

export type UnlimitedShelfItem = BaseShelfItem & {
    availability: 'unlimited'
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

