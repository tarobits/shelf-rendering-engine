import { computeShelf } from "../engine/computeShelfLayout"
import { EntityLocation, IdentificationCode } from "./misc"
import { ShelfType, ShelfSizes } from "./shelf"
import { FrontShelfView, SideShelfView } from "./shelfView"

export type RenderableShelfItem = {
    width: number;
    height: number;
    depth?: number;
    frontView: FrontShelfView;
    title: string;
    subtitle?: string;
    description?: string;
    sideView?: SideShelfView;
    count?: number;
    identification_code?: IdentificationCode[];
    location?: EntityLocation[];
}

export class RenderableShelfSection {
    readonly width: number;
    readonly height: number;
    readonly sortBookInverted: boolean;
    readonly bottom: {
        width: number,
        color: string
    } | false;
    readonly wall: {
        position: 'left' | 'right',
        color: string,
        width: number
    } | false;
    items: RenderableShelfItem[] = [];

    constructor(
        width: number,
        height: number,
        sortBookInverted: boolean,
        bottom: {width: number,color: string},
        wall: {position: 'left' | 'right',color: string,width: number} | false
    ) {
        this.width = width;
        this.height = height;
        this.sortBookInverted = sortBookInverted;
        this.bottom = bottom.width === 0 ? false : bottom;
        this.wall = wall;
    }

    addItem(item: RenderableShelfItem, position?: number) {
        if (item.height > this.height) throw new Error('Shelf item cannot be bigger than section.');
        if (!this.itemFits(item)) throw new Error('Shelf item does not fit into section.');
        if (position && this.items[position] !== undefined) throw new Error(`Position ${position} is already occupied.`)
        if (position) {
            this.items[position] = item;
            return;
        }
        if (this.items.length === 0) {
            this.items[0] = item;
            return;
        }
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === undefined) {
                this.items[i] = item;
                break;
            }
        }
    }

    itemFits(item: RenderableShelfItem) {
        return this.getSpaceLeft() > item.width;
    }

    private getSpaceLeft(): number {
        let taken = 0;
        this.items.forEach((item) => {
            taken += item.width;
        })
        const left = this.width - taken;
        if (left < 0) throw new Error('Section is wider than allowed.');
        return left;
    }
}

export class RenderableShelfRow {
    height: number = 0;
    readonly width: number;
    sections: RenderableShelfSection[] = [];

    constructor(width: number) {
        this.width = width;
    }

    addSection(section: RenderableShelfSection, position?: number) {
        if (this.height !== section.height && this.height !== 0) throw new Error('Sections with the same y value have to have matching heights.');
        if (!this.sectionFits(section)) throw new Error('Section does not fit into row.');
        this.height = section.height;
        if (position && this.sections[position] !== undefined) throw new Error(`Position x: ${position} is already occupied.`);
        if (position) {
            this.sections[position] = section;
            return;
        }
        if (this.sections.length === 0) {
            this.sections[0] = section;
            return;
        }
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i] === undefined) {
                this.sections[i] = section;
                break;
            }
        }
    }

    sectionFits(section: RenderableShelfSection): boolean {
        return this.getSpaceLeft() > section.width;
    }

    private getSpaceLeft(): number {
        let taken: number = 0;
        this.sections.forEach((section) => {
            taken += section.width;
            if (section.wall !== false) {
                taken += section.wall.width;
            }
        });

        const left = this.width - taken;
        if (left < 0) throw new Error('Row is wider than allowed.');
        return left;
    }
}

export class RenderableShelf {
    readonly title?: string;
    readonly subtitle?: string;
    readonly location?: EntityLocation[];
    readonly innerWidth: number;
    readonly innerHeight: number;
    readonly topWidth: number;
    readonly bottomWidth: number;
    readonly rightWidth: number;
    readonly leftWidth: number;
    readonly backgroundColor: string;
    readonly outerColor: string;
    model: RenderableShelfRow[] = [];

    constructor(
        innerWidth: number,
        innerHeight: number,
        topWidth: number,
        bottomWidth: number,
        rightWidth: number,
        leftWidth: number,
        backgroundColor: string,
        outerColor: string,
        title?: string,
        subtitle?: string,
        location?: EntityLocation[]
    ) {
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
        this.topWidth = topWidth;
        this.bottomWidth = bottomWidth;
        this.rightWidth = rightWidth;
        this.leftWidth = leftWidth;
        this.backgroundColor = backgroundColor;
        this.outerColor = outerColor;
        this.title = title;
        this.subtitle = subtitle;
        this.location = location;
    }

    static getShelfFromParams(shelf: ShelfType): RenderableShelf;
    static getShelfFromParams(partialShelf: Omit<ShelfType, 'innerWidth' | 'innerHeight' | 'topWidth' | 'bottomWidth' | 'rightWidth' | 'leftWidth'>, sizes: ShelfSizes): RenderableShelf;

    static getShelfFromParams(shelf: ShelfType | Omit<ShelfType, 'innerWidth' | 'innerHeight' | 'topWidth' | 'bottomWidth' | 'rightWidth' | 'leftWidth'>, sizes?: ShelfSizes): RenderableShelf {
        let combined: ShelfType;
        if ('innerWidth' in shelf) {
            combined = shelf;
        } else if (sizes) {
            combined = {
                ...shelf,
                ...sizes
            }
        } else {
            throw new Error('Something went wrong while creating shelf');
        }

        return computeShelf(combined);
    }

    addShelfRow(row: RenderableShelfRow, position?: number) {
        if (this.innerWidth < row.width) throw new Error('Row is wider than shelf.');
        if (!this.shelfRowFits(row)) throw new Error('Row does not fit into shelf.');
        if (position && this.model[position] !== undefined) throw new Error(`Position y: ${position} is already occupied.`);
        if (position) {
            this.model[position] = row;
            return;
        }
        if (this.model.length === 0) {
            this.model[0] = row;
            return;
        }
        for (let i = 0; i < this.model.length; i++) {
            if (this.model[i] === undefined) {
                this.model[i] = row;
                break;
            }
        }
    }

    shelfRowFits(row: RenderableShelfRow): boolean {
        return this.getSpaceLeft() > row.height;
    }

    private getSpaceLeft(): number {
        let taken = 0;
        this.model.forEach((row) => {
            taken += row.height;
        })

        const left = this.innerHeight - taken;
        if (left < 0) throw new Error('Shelf is higher than allowed.');
        return left;
    }
}