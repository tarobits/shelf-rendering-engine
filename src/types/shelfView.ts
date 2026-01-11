import { DisplayStyle } from "./misc";

type ImageShelfView = {
    type: 'image',
    url: string
}

type ColorShelfView = {
    type: 'color',
    color: string,
    exclude?: {
        title?: boolean,
        subtitle?: boolean
    }
}

export type FrontShelfView = ImageShelfView | ColorShelfView;

type BaseSideView = {
    sideView: {
        style?: {
            background?: DisplayStyle,
            title?: DisplayStyle,
            subtitle?: DisplayStyle,
            description?: DisplayStyle,
            location?: Record<string, {
                key?: DisplayStyle,
                value?: DisplayStyle
            }> | {
                key?: DisplayStyle, 
                value?: DisplayStyle
            },
            identification_code?: Record<string, {
                key?: DisplayStyle,
                value?: DisplayStyle
            }> | {
                key?: DisplayStyle,
                value?: DisplayStyle
            }
        },
        exclude?: {
            title?: boolean,
            subtitle?: boolean,
            description?: boolean,
            location?: boolean,
            identification_code?: boolean | Array<string> | Array<number>
        }
    }
}

type SideImageShelfView = ImageShelfView & BaseSideView;

type SideColorShelfView = ColorShelfView & BaseSideView;

export type SideShelfView = SideImageShelfView | SideColorShelfView;
