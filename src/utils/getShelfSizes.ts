import { ShelfSizes } from "@/types";

export function getShelfSizes(
    innerHeight: number,
    innerWidth: number,
    tbWidth: number,
    lrWidth: number
): ShelfSizes;

export function getShelfSizes(
    innerHeight: number,
    innerWidth: number,
    topWidth: number,
    bottomWidth: number,
    rightWidth: number,
    leftWidth: number
): ShelfSizes;

export function getShelfSizes(
    innerHeight: number,
    innerWidth: number,
    totalHeight: number,
    totalWidth: number
): ShelfSizes;

export function getShelfSizes(
    totalHeight: number,
    totalWidth: number,
    tbWidth: number,
    lrWidth: number
): ShelfSizes;

export function getShelfSizes(
    totalHeight: number,
    totalWidth: number,
    topWidth: number,
    bottomWidth: number,
    leftWidth: number,
    rightWidth: number
): ShelfSizes;

export function getShelfSizes(
    innerHeight?: number,
    innerWidth?: number,
    totalHeight?: number,
    totalWidth?: number,
    tbWidth?: number,
    lrWidth?: number,
    topWidth?: number,
    bottomWidth?: number,
    rightWidth?: number,
    leftWidth?: number
):ShelfSizes {
    let res: ShelfSizes = {
        innerHeight: 0,
        innerWidth: 0,
        topWidth: 0,
        bottomWidth: 0,
        rightWidth: 0,
        leftWidth: 0
    };

    if (innerHeight) res.innerHeight = innerHeight;
    if (innerWidth) res.innerWidth = innerWidth;
    if (topWidth) res.topWidth = topWidth;
    if (bottomWidth) res.bottomWidth = bottomWidth;
    if (rightWidth) res.rightWidth = rightWidth;
    if (leftWidth) res.leftWidth = leftWidth;

    if (lrWidth && tbWidth) {
        res.leftWidth = lrWidth;
        res.rightWidth = lrWidth;
        res.bottomWidth = tbWidth;
        res.topWidth = tbWidth;
    }

    if (innerHeight && innerWidth && !totalHeight && !totalWidth) {
        return res;
    }

    if (totalHeight && totalWidth) {
        if (innerHeight && innerWidth) {
            let lr = (totalWidth-innerWidth)/2;
            let tb = (totalHeight-innerHeight)/2;
            res.bottomWidth = tb;
            res.topWidth = tb;
            res.leftWidth = lr;
            res.rightWidth = lr;
            return res;
        }
        res.innerWidth = totalWidth-(res.rightWidth+res.leftWidth);
        res.innerHeight = totalHeight-(res.topWidth+res.bottomWidth);
        return res;
    }
    throw new Error('Something went wrong while calculating.');
}