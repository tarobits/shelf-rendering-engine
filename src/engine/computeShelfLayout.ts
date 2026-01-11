import { ShelfType, ShelfItem, ShelfSection } from "../types";
import { validateShelf } from "./validateShelf";
import { RenderableShelf, RenderableShelfItem, RenderableShelfRow, RenderableShelfSection } from "../types/engine";
import { computeShelfPercentageSizing } from "./computeShelfSizing";
import { removeEmptyFromArray } from "./utils";

export function computeShelf(shelf: ShelfType): RenderableShelf {
    validateShelf(shelf);
    let newShelf = new RenderableShelf(shelf.innerWidth, shelf.innerHeight, shelf.topWidth, shelf.bottomWidth, shelf.rightWidth, shelf.leftWidth, shelf.backgroundColor, shelf.outerColor, shelf.title, shelf.subtitle, shelf.location);

    return computeRows(shelf.model, newShelf);
}

function computeRows(sections: ShelfSection[], shelf: RenderableShelf): RenderableShelf {
    let rows: RenderableShelfRow[] = [];

    let unsortedY: ShelfSection[] = [];
    let unsortedX: ShelfSection[] = [];

    for (const i of sections.keys()) {
        let section = sections[i];
        if (section.y == null) {
            unsortedY.push(section);
            continue;
        }
        if (section.x == null) {
            unsortedX.push(section);
            continue;
        }
        if (rows[section.y] === undefined) rows[section.y] = new RenderableShelfRow(shelf.innerWidth);

        rows[section.y].addSection(computeSection(createSection(section,shelf), section.items));
    }
    for (const i of unsortedX.keys()) {
        let section = unsortedX[i];
        if (section.y == null) throw new Error('Something went wrong while sorting sections.');
        if (rows[section.y] === undefined) rows[section.y] = new RenderableShelfRow(shelf.innerWidth);
        rows[section.y].addSection(computeSection(createSection(section,shelf), section.items));
    }
    for (const i of unsortedY.keys()) {
        let raw = unsortedY[i];
        let section = createSection(unsortedY[i],shelf);
        if (rows.length === 0) rows[0] = new RenderableShelfRow(shelf.innerWidth);
        for (const j of rows.keys()) {
            let row = rows[j];
            if (!row.sectionFits(section)) continue;
            rows[j].addSection(computeSection(section, raw.items), raw.x);
        }
    }

    rows = removeEmptyFromArray(rows);
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        row.sections = removeEmptyFromArray(row.sections);
        shelf.addShelfRow(row, i);
    }
    return shelf;
}

function createSection(section: ShelfSection, shelf: RenderableShelf): RenderableShelfSection {
    if (section.height === undefined || section.width === undefined) {
        throw new Error('Error while creating section.');
    }
    if (section.wall && !section.wall.color) section.wall.color = shelf.outerColor;
    if (typeof section.width === "string") section.width = computeShelfPercentageSizing(shelf, "width", section.width);
    if (typeof section.height === "string") section.height = computeShelfPercentageSizing(shelf, "height", section.height);
    if (section.sortBooksInverted === undefined) section.sortBooksInverted = false;
    const bottom = {
        ...section.bottom,
        color: section.bottom.color ?? shelf.outerColor
    }
    const wall = section.wall === undefined ? false : {
        ...section.wall,
        color: section.wall.color ?? shelf.outerColor
    }
    if (wall !== false) {
        section.width += wall.width;
    }
    section.height += bottom.width;
    return new RenderableShelfSection(section.width, section.height, section.sortBooksInverted, bottom, wall);
}

function computeSection(section: RenderableShelfSection, items: ShelfItem[]): RenderableShelfSection {
    let unsorted: ShelfItem[] = [];

    for (const i of items.keys()) {
        let item = items[i];
        if (item.positionInRow == null) {
            unsorted.push(item);
            continue;
        }

        section.addItem(computeItem(item), item.positionInRow);
    }

    for (const i of unsorted.keys()) {
        let item = unsorted[i];
        section.addItem(computeItem(item));
    }

    section.items = removeEmptyFromArray(section.items);

    return section;
}

function computeItem(item: ShelfItem): RenderableShelfItem {
    let res: RenderableShelfItem = {
        width: item.width,
        height: item.height,
        frontView: item.frontView,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        identification_code: item.identification_code,
        location: item.location,
        count: item.availibility === "limited" ? item.count : undefined,
        depth: item.expandable === true ? item.depth : undefined,
        sideView: item.expandable === true ? item.sideView : undefined
    }
    return res;
}