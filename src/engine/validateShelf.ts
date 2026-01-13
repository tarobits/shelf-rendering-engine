import { RGB, ShelfType, ShelfItem, ShelfSection } from "../types";
import { computeShelfPercentageSizing } from "./computeShelfSizing";
import { between } from "./utils";

export function validateURL(url: string) {
    return url.match(/^https?:\/\/[^\s?#]+\.(png|jpe?g|webp)(\?[^\s#]*)?(#[^\s]*)?$/g) !== null;
}

export function validateColor(color: string|RGB) {
    if (typeof color === "object") {
        return between(color.r,0,255) && between(color.g,0,255) && between(color.b,0,255);
    }
    const el = document.createElement('div');
    el.style.color = color;
    return el.style.color !== "";
}

export function validateShelfItem(shelf: ShelfType, section: ShelfSection, item: ShelfItem) {
    if (item.height <= 0) throw new Error(`The height of item ${item.title} must be higher than 0.`);
    if (section.height) {
        if (
            (typeof section.height === "number" && item.height > section.height) ||
            (typeof section.height === "string" && computeShelfPercentageSizing(shelf, "height", section.height) < item.height)
        ) throw new Error(`Height of item ${item.title} cannot be bigger than section height.`);
    }
    if (item.width <= 0) throw new Error(`The width of item ${item.title} must be higher than 0.`);
    if (section.width) {
        if (
            (typeof section.width === "number" && item.width > section.width) ||
            (typeof section.width === "string" && computeShelfPercentageSizing(shelf, "width", section.width) < item.width)
        ) throw new Error(`Width of item ${item.title} cannot be bigger than section width.`);
    }
    if (item.availability === "limited" && item.count < 0) throw new Error(`The count of item ${item.title} must be 0 or higher.`);
    if (item.frontView.type === "image" && !validateURL(item.frontView.url)) throw new Error(`The frontView image of item ${item.title} is not a valid image url.`);
    if (item.frontView.type === "color" && !validateColor(item.frontView.color)) throw new Error(`The frontView color of item ${item.title} is not a valid color.`);
    if (item.expandable) {
        if (item.depth <= 0) throw new Error(`The depth of item ${item.title} must be higher than 0.`);
        if (item.sideView.type === "image" && !validateURL(item.sideView.url)) throw new Error(`The sideView image of item ${item.title} is not a valid image url.`);
        if (item.sideView.type === "color" && !validateColor(item.sideView.color)) throw new Error(`The sideView color of item ${item.title} is not a valid color.`);
    }
    return;
}

export function validateShelfSection(shelf: ShelfType, section: ShelfSection) {
    if (section.height) {
        if (typeof section.height === "string") {
            if (!section.height.endsWith('%')) throw new Error(`Section has height value of ${section.height}. If not using numbers height must end with %.`);
            if (parseInt(section.height.slice(0,-1)) > 100) throw new Error(`Section cannot be higher than shelf.`);
        } 
        if (typeof section.height === "number") {
            if (section.height <= 0) throw new Error(`Section height must be higher than 0.`);
            if (section.height > shelf.innerHeight) throw new Error(`Section cannot be higher than shelf.`);
        }
    }
    if (section.width) {
        if (typeof section.width === "string") {
            if (!section.width.endsWith('%')) throw new Error(`Section has width value of ${section.width}. If not using numbers width must end with %.`);
            if (parseInt(section.width.slice(0,-1)) > 100) throw new Error(`Section cannot be wider than shelf.`);
        } 
        if (typeof section.width === "number") {
            if (section.width <= 0) throw new Error(`Section width must be higher than 0.`);
            if (section.width > shelf.innerWidth) throw new Error(`Section cannot be wider than shelf.`);
        }
    }
    if (section.wall) {
        if (section.wall.width <= 0) throw new Error(`Section wall width must be bigger than 0.`);
        if (section.wall.color && !validateColor(section.wall.color)) throw new Error(`Section wall color is not a valid color.`);
    }
    if (section.bottom.width < 0) throw new Error(`Section bottom width must be 0 or bigger.`);
    if (section.bottom.color && !validateColor(section.bottom.color)) throw new Error(`Section bottom color is not a valid color.`);
     
    section.items.forEach((item) => {
        validateShelfItem(shelf, section, item);
    })
    // ToDo: Add functionality to check if items are too big for section
    return;
}

export function validateShelf(shelf: ShelfType) {
    if (shelf.innerHeight <= 0) throw new Error(`Shelf innerHeight must be bigger than 0.`);
    if (shelf.innerWidth <= 0) throw new Error(`Shelf innerWidth must be bigger than 0.`);
    if (shelf.bottomWidth < 0) throw new Error(`Shelf bottomWidth must be 0 or bigger.`);
    if (shelf.topWidth < 0) throw new Error(`Shelf topWidth must be 0 or bigger.`);
    if (shelf.leftWidth < 0) throw new Error(`Shelf leftWidth must be 0 or bigger.`);
    if (shelf.rightWidth < 0) throw new Error(`Shelf rightWidth must be 0 or bigger.`);
    if (!validateColor(shelf.backgroundColor)) throw new Error(`Shelf backgroundColor is not a valid color.`);
    if (!validateColor(shelf.outerColor)) throw new Error(`Shelf outerColor is not a valid color.`);
    shelf.model.forEach((section) => {
        validateShelfSection(shelf, section);
    })
    // ToDo: Add functionality to check if sections are too big for shelf
    return;
}